const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { Post } = require("./forDb");
require("dotenv").config();

const TOKEN = process.env.API_KEY_BOT;
const postUrl = "https://shetagri-back.vercel.app/";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

const getMaxPhoto = (photos) => {
  return photos.reduce((prev, current) =>
    current.width > prev.width ? current : prev,
  );
};

const processMessage = async (message) => {
  if (message) {
    try {
      const body = {
        text: message.text || message.caption,
      };

      if (message.photo) {
        const maxPhoto = getMaxPhoto(message.photo);
        const fileData = await bot.getFile(maxPhoto.file_id);
        const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;
        body.pic = imageUrl;
      }

      await axios.post(postUrl, body);
      await Post.create(body);

      await bot.sendMessage(message.chat.id, "Пост добавлен");
    } catch (error) {
      console.error(error);
      await bot.sendMessage(
        message.chat.id,
        "Произошла ошибка при добавлении поста",
      );
    }
  }
};

bot.on("message", processMessage);

module.exports = processMessage;
