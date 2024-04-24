const express = require('express');
const tagsRouter = express.Router();
const { requireUser } = require('./utils'); // Import requireUser middleware
const {
  getAllTags,
  getPostsByTagName
} = require('../db');

tagsRouter.get('/', async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({ tags });
  } catch (error) {
    next(error);
  }
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  let { tagName } = req.params;
  tagName = decodeURIComponent(tagName);
  try {
    const allPosts = await getPostsByTagName(tagName);
   
    const posts = allPosts.filter(post => {
      if (post.active || (req.user && req.user.id === post.author.id)) {
        return true;
      }
      return false;
    });
    res.send({ posts });
  } catch (error) {
    next(error);
  }
});

tagsRouter.post('/', requireUser, async (req, res, next) => {
  try {

    res.send({ message: 'Create a new tag here' });
  } catch (error) {
    next(error);
  }
});

tagsRouter.put('/:id', requireUser, async (req, res, next) => {
  try {

    res.send({ message: `Update tag with ID ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

tagsRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {

    res.send({ message: `Delete tag with ID ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});
module.exports = tagsRouter;