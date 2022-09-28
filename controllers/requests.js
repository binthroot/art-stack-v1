// TODO - add cloudinary for image uploads
//const cloudinary = require('../middleware/cloudinary');

const Request = require('../models/Request');
const Comment = require('../models/Comment');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const requests = await Request.find({ user: req.user.id });
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
      const request = await Request.findById(req.params.id);
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
  createRequest: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.body);
      await Request.create({
        requestName: req.body.requestName,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        price: req.body.price,
        dueDate: req.body.dueDate,
        sku: req.body.sku,
        descriptionTaste: req.body.descriptionTaste,
        user: req.user.id,
      });
      console.log('Request has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },

  deleteRequest: async (req, res) => {
    try {
      // Find post by id
      let post = await Request.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Request.remove({ _id: req.params.id });
      console.log('Deleted Request');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
