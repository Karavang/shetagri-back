const TelegramBot = require("node-telegram-bot-api");
const { Post } = require("./forDb");
const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.API_KEY_BOT;

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

bot.on("message", async (message) => {
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

        // Сохранение изображения в MongoDB
        async function downloadAndSaveImage(url) {
          try {
            const response = await axios.get(url, {
              responseType: "arraybuffer",
            });
            body.data = Buffer.from(response.data, "binary");
            body.contentType = response.headers["content-type"];

            console.log("Изображение успешно сохранено в MongoDB.");
          } catch (error) {
            console.error(
              "Ошибка при загрузке и сохранении изображения:",
              error.message,
            );
          }
        }

        const imageUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileData.file_path}`;

        body.pic = await downloadAndSaveImage(imageUrl);
        console.log(body);
        await Post.create(body);
        bot.sendMessage(message.from.id, "Пост добавлен");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
