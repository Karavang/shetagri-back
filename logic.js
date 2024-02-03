const TelegramBot = require("node-telegram-bot-api");
const { Post, Feed } = require("./forDb");

const downloadAndSaveImage = require("./hooks/downloadAndSaveImages");
require("dotenv").config();

const TOKEN = process.env.API_KEY_BOT;

const bot = new TelegramBot(TOKEN, {
  polling: true,
});
let state;
let body = {};
bot.on("message", async (message) => {
  try {
    if (message.entities && message.entities[0].type === "bot_command") {
      state = message.text;
      bot.sendMessage(message.from.id, "Введите название");
    }

    if (state !== undefined && message.entities === undefined) {
      if (state === "/addpost") {
        if (!body.title) {
          body.title = message.text;
          console.log(body);
          bot.sendMessage(message.from.id, "Введите текст");
        } else if (!body.text) {
          body.text = message.text || message.caption;
          console.log(body);
          bot.sendMessage(message.from.id, "Кинь фотку");
        } else if (!body.pic) {
          if (message.photo) {
            const maxPhoto = message.photo.reduce((prev, current) =>
              current.width > prev.width ? current : prev,
            );
            const fileData = await bot.getFile(maxPhoto.file_id);
            const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;
            const image = await downloadAndSaveImage(imageUrl);

            body.pic = imageUrl;
            body.data = image.data;
            body.contentType = image.contentType;
            console.log(body);
            await Post.create(body);
            bot.sendMessage(message.from.id, "Пост добавлен");
            state = ""; // Reset state after completing the post creation
            body = {}; // Reset body object for the next post
          }
        }
      }

      if (state === "/addfeed") {
        if (message.photo) {
          const maxPhoto = message.photo.reduce((prev, current) => {
            if (current.width > prev.width) {
              return current;
            }
            return prev;
          });
          const fileData = await bot.getFile(maxPhoto.file_id);

          const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;
          const image = await downloadAndSaveImage(imageUrl);

          await Feed.create(image);
          bot.sendMessage(message.from.id, "Отзыв добавлен");
          state = "";
        }
      }
    }
  } catch (error) {
    state = "";
    console.log(error);
  }
});
