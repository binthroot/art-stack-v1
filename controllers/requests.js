// TODO - add cloudinary for image uploads
//const cloudinary = require('../middleware/cloudinary');

const Request = require('../models/Request');
const Comment = require('../models/Comment');
const { request } = require('express');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Request.find({ user: req.user.id });
      res.render('profile.ejs', { requests: requests, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const requests = await Request.find().sort({ createdAt: 'desc' }).lean();
      res.render('feed.ejs', { requests: requests });
    } catch (err) {
      console.log(err);
    }
  },
  getRequest: async (req, res) => {
    try {
      // TODO - alter profile page to list request by user
      const post = await Request.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: 'desc' })
        .lean();
      res.render('request.ejs', {
        request: request,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log('Post has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
};

//Post Routes - simplified for now
router.get('/:id', ensureAuth, requestController.getRequest);

router.post('/createRequest', requestController.createRequest);

// Will use when uploading images for request later
// router.post('/createPost', upload.single('file'), postsController.createPost);

router.delete('/deletePost/:id', postsController.deletePost);
