const { Post } = require("./forDb");
const postPost = async (req, res) => {
  try {
    console.log(req.body);
    await Post.create(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({ message: `Cannot take posts. Code of error:aboba` });
  }
};
module.exports = postPost;
