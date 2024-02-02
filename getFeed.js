const { Feed } = require("./forDb");

const getFeed = async (req, res) => {
  try {
    const posts = await Feed.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Cannot take posts. Code of error:${error}` });
  }
};
module.exports = getFeed;
