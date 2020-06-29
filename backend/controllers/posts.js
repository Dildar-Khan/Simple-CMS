const Post = require("../models/posts");

exports.createPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  // console.log(req.body);
  const post = new Post({
    postTitle: req.body.postTitle,
    postStatus: req.body.postStatus,
    // allowComments: req.body.allowComments,
    postDescription: req.body.postDescription,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  // console.log(post);
  post
    .save()
    .then((createdPost) => {
      res.status(200).json({
        message: "Post saved!",
        post: {
          id: createdPost._id,
          postTitle: createdPost.postTitle,
          postStatus: createdPost.postStatus,
          postDescription: createdPost.postDescription,
          imagePath: createdPost.imagePath,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "post creation failed!",
      });
    });
};

exports.updatePost = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    postTitle: req.body.postTitle,
    postStatus: req.body.postStatus,
    // allowComments: req.body.allowComments,
    postDescription: req.body.postDescription,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Updated Successfully!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "post not updated!",
      });
    });
};

exports.getPosts = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.countDocuments();
      // res.status(200).json({
      //   message: 'Posts are fecting now!',
      //   posts: documents
      // });
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts are fetching now!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching posts failed!",
      });
    });
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "fetching post failed!",
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      // console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Post Deleted!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deletion failed!",
      });
    });
};
