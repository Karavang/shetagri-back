const TelegramBot = require("node-telegram-bot-api");
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

const processMessage = (message) => {
  if (message) {
    const body = {
      text: message.text || message.caption,
    };

    if (message.photo) {
      const maxPhoto = getMaxPhoto(message.photo);
      const fileData = bot.getFile(maxPhoto.file_id);
      const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;
      body.pic = imageUrl;
    }

    return body;
  }
};

bot.on("message", (message) => {
  const body = processMessage(message);
  if (body) {
    axios
      .post(postUrl, body)
      .then(() => {
        Post.create(body);
        bot.sendMessage(message.chat.id, "Пост добавлен");
      })
      .catch((error) => {
        console.error(error);
        bot.sendMessage(
          message.chat.id,
          "Произошла ошибка при добавлении поста",
        );
      });
  }
});

module.exports = processMessage;
