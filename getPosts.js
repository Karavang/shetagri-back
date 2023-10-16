const { Post } = require("./forDb");
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Cannot take posts. Code of error:${error}` });
  }
};
module.exports = getPosts;
