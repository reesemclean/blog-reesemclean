const fs = require('fs-extra')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  await processInbox(graphql)

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/blog-post.tsx')

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const processInbox = async graphql => {
  const result = await graphql(
    `
      {
        allFile(
          filter: {
            internal: { mediaType: { eq: "text/markdown" } }
            sourceInstanceName: { eq: "inbox" }
          }
        ) {
          edges {
            node {
              absolutePath
              childMarkdownRemark {
                frontmatter {
                  title
                  date
                  slug
                }
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }
  if (!result.data.allFile) {
    return
  }
  result.data.allFile.edges.forEach(edge => {
    const inboxPath = edge.node.absolutePath
    const frontmatter = edge.node.childMarkdownRemark.frontmatter
    processInboxFile(inboxPath, frontmatter)
  })
}

function processInboxFile(inboxPath, frontmatter) {
  const frontmatterTitle = frontmatter.title
  if (!frontmatterTitle) {
    throw Error('Missing title frontmatter for file: ' + inboxPath)
  }

  const postDate = frontmatter.date ? new Date(frontmatter.date) : new Date()
  const filename = slugify(
    frontmatter.slug ? frontmatter.slug : frontmatter.title
  )

  const parts = inboxPath.split(path.sep)
  const isFolder = parts[parts.length - 2] !== 'inbox'

  const pathPrefix = path.resolve(
    'posts',
    postDate.getFullYear().toString(),
    padLeft((postDate.getMonth() + 1).toString(), 2, '0'),
    padLeft(postDate.getDate().toString(), 2, '0')
  )

  if (isFolder) {
    const oldFolderPath = parts.slice(0, parts.length - 1).join(path.sep)
    const newFolderPath = path.resolve(pathPrefix, `${filename}`)
    const renamedFilePath = path.resolve(oldFolderPath, 'index.md')
    fs.moveSync(inboxPath, renamedFilePath)

    addFrontMatterToFile(renamedFilePath, postDate, filename)
    fs.moveSync(oldFolderPath, newFolderPath)
  } else {
    const newPath = path.resolve(pathPrefix, `${filename}.md`)

    addFrontMatterToFile(inboxPath, postDate, filename)
    fs.moveSync(inboxPath, newPath)
  }
}

function padLeft(string, length, character) {
  const padLength = length - string.length
  if (padLength <= 0) return string
  const pad = character.repeat(padLength)
  return pad + string
}

function addFrontMatterToFile(oldPath, date, filename) {
  const fileLines = fs
    .readFileSync(oldPath)
    .toString()
    .split('\n')
  const titleLine = fileLines.findIndex(value => value.startsWith('title:'))

  let dateLineIndex = fileLines.findIndex(value => value.startsWith('date:'))
  if (dateLineIndex === -1) {
    dateLineIndex = titleLine + 1
    fileLines.splice(dateLineIndex, 0, `date: "${date.toISOString()}"`)
  }

  let slugLineIndex = fileLines.findIndex(value => value.startsWith('slug:'))
  if (slugLineIndex === -1) {
    slugLineIndex = dateLineIndex + 1
    fileLines.splice(slugLineIndex, 0, `slug: ${filename}`)
  }

  const newContent = fileLines.join('\n')
  fs.outputFileSync(oldPath, newContent)
}

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}
