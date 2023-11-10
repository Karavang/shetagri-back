const { Schema, model, connect } = require("mongoose");
const fromEnv = process.env;
const schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    data: {
      type: Buffer,
      required: false,
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
const Post = model("post", schema);

const mongoConnect = async () => {
  try {
    await connect(fromEnv.LINK);
    console.log("connected");
  } catch (error) {
    console.log(`We has any problems with connection to db. Error:${error}`);
  }
};

module.exports = { Post, mongoConnect };
