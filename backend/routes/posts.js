const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/posts');
const MulterFile = require('../middleware/multer-file');


router.post('/create', checkAuth, MulterFile, PostController.createPost)

router.get('/posts', PostController.getPosts)

router.get('/posts/:id', PostController.getPost)

router.put('/update/:id', checkAuth, MulterFile, PostController.updatePost)

router.delete('/delete/:id', checkAuth, PostController.deletePost);
module.exports = router;
