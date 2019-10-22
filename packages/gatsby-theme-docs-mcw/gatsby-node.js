const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const withDefaults = require('./utils/default-options')

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState()
  const { contentPath } = withDefaults(options)
  const dir = path.join(program.directory, contentPath)

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }
}

exports.createSchemaCustomization = ({ actions }, options) => {
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat
      body: String!
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefaults(options)
  const parent = getNode(node.parent)

  // only work on MDX files loaded by this theme
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs-mcw'
  )
    return

  // handle index.mdx as index file
  // stupid regex to fix the stupid windows url breaking stuff
  const pageName = parent.name !== 'index' ? parent.name : ''
  const pathToMake = path
    .join('', basePath, parent.relativeDirectory, pageName)
    .replace(/\\/g, '/')

  actions.createNode({
    id: createNodeId(`DocsPages-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: pathToMake,
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // load the resolver for the mdx type 'body' field
          const type = info.schema.getType('Mdx')
          const mdxFields = type.getFields()
          const resolver = mdxFields.body.resolve

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          })
        },
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allDocsPage {
        nodes {
          id
          path
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('Error loading docs', result.errors)
  }

  const pages = result.data.allDocsPage.nodes

  pages.forEach(page => {
    actions.createPage({
      path: page.path,
      component: require.resolve('./src/templates/docs-page-template'),
      context: {
        pageID: page.id,
      },
    })
  })
}
