const { Post } = require("./forDb");
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    const revertedPosts = posts.reverse();
    res.status(200).json(revertedPosts);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Cannot take posts. Code of error:${error}` });
  }
};
module.exports = getPosts;
