const axios = require("axios");
async function downloadAndSaveImage(url) {
  try {
    const body = {};
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    body.data = Buffer.from(response.data, "binary");
    body.contentType = response.headers["content-type"];
    console.log("Изображение успешно сохранено в MongoDB.");
    return body;
  } catch (error) {
    console.error(
      "Ошибка при загрузке и сохранении изображения:",
      error.message,
    );
  }
}
module.exports = downloadAndSaveImage;
