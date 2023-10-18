const TelegramBot = require("node-telegram-bot-api");
const { Post } = require("./forDb");
const postPost = require("./postPost");
const { default: axios } = require("axios");
require("dotenv").config();
const TOKEN = process.env.API_KEY_BOT;

const bot = new TelegramBot(TOKEN, {
  polling: true,
});
const postUrl = "https://shetagri-back.vercel.app/";
const logicBot = bot.on("message", async (message) => {
  try {
    if (message) {
      const body = {
        text: message.text || message.caption,
      };
      if (message.photo) {
        const maxPhoto = message.photo.reduce((prev, current) => {
          if (current.width > prev.width) {
            return current;
          }
          return prev;
        });
        const fileData = await bot.getFile(maxPhoto.file_id);
        const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;
        body.pic = imageUrl;
      }
      console.log(body);
      axios.post(postUrl, body);
      // Post.create(body);
      bot.sendMessage(message.from.id, "Пост добавлен");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = logicBot;
