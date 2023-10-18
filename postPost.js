const { Post } = require("./forDb");
const postPost = async (req, res) => {
  try {
    res.status(200).json(res.body);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Cannot take posts. Code of error:${error}` });
  }
};
module.exports = postPost;
