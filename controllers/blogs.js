const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => {
          console.log(error)
      })
  })

blogRouter.get('/:id', (request, response) => {
    const blogId = request.params.id
    Blog
    .findById(blogId)
    .then(blog => {
        response.json(blog)
    })
    .catch(error => {
        console.log(error)
        if(error.name === 'CastError') {
            return response.status(400).json({error: 'malformed id'})
        }
        response.status(400).json({error: error.message})
    })
})
  
blogRouter.post('/', (request, response) => {
    
    const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })

    newBlog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => {
            console.log(error)
            return response.status(400).json({error: error.message})
        })
  })

  module.exports = blogRouter