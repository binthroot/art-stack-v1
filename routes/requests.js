const express = require('express');
const router = express.Router();
// const upload = require('../middleware/multer');
const requestController = require('../controllers/requests');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Post Routes - simplified for now
router.get('/:id', ensureAuth, requestController.getRequest);

router.post('/createRequest', requestController.createRequest);

// Will use when uploading images for request later
// router.post('/createPost', upload.single('file'), postsController.createPost);

router.delete('/deleteRequest/:id', requestController.deleteRequest);

// TODO - edit post option

router.get('/getEditPage/:id', requestController.getEditPage);

router.put('/editRequest/:id', requestController.editRequest);

module.exports = router;
