const { Schema, model, connect } = require("mongoose");
const fromEnv = process.env;
const schemaPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: false,
    },
    pic: {
      type: String,
      required: false,
    },
  },
  { versionKey: false },
);

const schemaFeed = new Schema(
  {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: false,
    },
  },
  { versionKey: false },
);
const Post = model("post", schemaPost);
const Feed = model("feed", schemaFeed);

const mongoConnect = async () => {
  try {
    await connect(fromEnv.LINK);
    console.log("connected");
  } catch (error) {
    console.log(`We has any problems with connection to db. Error:${error}`);
  }
};

module.exports = { Post, Feed, mongoConnect };
