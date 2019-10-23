require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: 'src/images' },
    },
    {
      resolve: 'gatsby-transformer-cloudinary',
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        uploadFolder: 'fem-workshop',
      },
    },
    'gatsby-theme-style-guide',
    {
      resolve: 'gatsby-theme-docs-mcw',
      options: {
        basePath: '/recipes',
        contentPath: 'content/recipes',
      },
    },
  ],
}
