const withDefaults = require('./utils/default-options')

module.exports = options => {
  const { contentPath, useExternalMDX } = withDefaults(options)
  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'gatsby-theme-docs-mcw',
          path: contentPath,
        },
      },
      !useExternalMDX && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js'),
          },
        },
      },
      'gatsby-plugin-theme-ui',
    ].filter(Boolean),
  }
}
