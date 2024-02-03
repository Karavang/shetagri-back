const { Post } = require("./forDb");

const getTextByPostId = async (req, res) => {
  try {
    console.log(req.params.postId);
    const contacts = await Post.find();
    const text = contacts.find((e) => e.id === req.params.postId);
    res.status(200).json(text.text);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = getTextByPostId;
