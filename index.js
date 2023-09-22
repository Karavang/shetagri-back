const express = require("express");
const { mongoConnect } = require("./forDb");
const PORT = process.env.PORT || 3000;
const app = express();
const { default: mongoose } = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const { Post } = require("./forDb");
require("dotenv").config();
const TOKEN = process.env.API_KEY_BOT;
const bot = new TelegramBot(TOKEN, {
  polling: true,
});
const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log("Server woke up");
  });
};
startServer();

// Логика бота
bot.on("message", async (message) => {
  console.log(message);
  const body = {
    text: message.text || message.caption,
    pic: message.photo,
  };
  console.log(body);
  const text = await Post.create(body);
  console.log(text);
  bot.sendMessage(message.from.id, "Пост добавлен");
});

// Запуск сервера
