const asyncHandler = require("express-async-handler");

const Post = require("../model/postModel");
const User = require("../model/userModel");

//@desc Create post
//@route POST /api/posts
//@access Private
const newPost = asyncHandler(async (req, res) => {
  if (!req.body.img) {
    res.status(400);
    throw new Error("Please add an image to your post");
  }

  if (!req.body.desc) {
    res.status(400);
    throw new Error("Please add a description to your post");
  }

  const post = await Post.create({
    img: req.body.img,
    desc: req.body.desc,
    user: req.user.id,
  });

  res.status(200).json(post, { message: "New post created successfully" });
});

//@desc Delete post
//@route DELETE /api/posts/:id
//@access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure user logged in matches goal user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id }, "Post deleted successfully");
});

//@desc Like/Dislike post
//@route put /api/posts/:id
//@access Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!post.likes.includes(req.body.user)) {
    await post.updateOne({
      $push: { likes: req.body.user },
    });
    res.status(200).json("Post has been liked");
  } else {
    await post.updateOne({
      $push: { likes: req.body.user },
    });
    res.status(200).json("Post has been disliked");
  }
});

//@desc get a post
//@route GET /api/posts/:id
//@access Private
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

//@desc get all my post
//@route GET /api/posts/my/:id
//@access Private
const getAllMyPost = asyncHandler(async (req, res) => {
  const myPosts = await Post.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(myPosts);
});

//@desc get all post
//@route GET /api/posts
//@access Private
const allPosts = asyncHandler(async (req, res) => {
  Post.find({}, function (err, post) {
    const postMap = {};

    post.forEach(function (post) {
      postMap[post.id] = post;
    });

    res.status(200).json(postMap);
  });
});

module.exports = {
  newPost,
  deletePost,
  likePost,
  getPost,
  getAllMyPost,
  allPosts,
};
