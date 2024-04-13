const { Jakan } = require("jakan");
const jakan = new Jakan().forSearch();
const miscClient = new Jakan().forMisc();
const getByTitle = async (req, res) => {
  const anime = req.body.title;
  const data = await jakan.anime(anime);
  const result = {
    title: data.data[0].titles.map((e) => e.title),
    image: data.data[0].images.jpg.large_image_url,
    trailer: data.data[0].trailer.embed_url,
    episodes: data.data[0].episodes,
    score: data.data[0].score,
    description: data.data[0].synopsis,
    year: data.data[0].year,
    genres: data.data[0].genres.map((genre) => genre.name),
    themes: data.data[0].themes.map((theme) => theme.name),
  };
  res.json(result);
};
const getTopCharts = async (req, res) => {
  const top = await miscClient.top("anime", {
    page: 1,
  });
  const ret = top.data.map((e) => {
    return {
      title: e.title,
      largeImageUrl: e.images.webp.large_image_url,
      genres: e.genres.map((genre) => genre.name),
    };
  });
  res.json(ret);
};
module.exports = { getByTitle, getTopCharts };
