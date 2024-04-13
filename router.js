const { Router } = require("express");
const getPosts = require("./getPosts");
const postPost = require("./postPost");
const sendForm = require("./sendForm");
const getFeed = require("./getFeed");
const getTextByPostId = require("./getTextByPostId");
const { getTopCharts, getByTitle } = require("./bytescape");
const router = new Router();

router.get("/shetagri/", getPosts);
router.get("/shetagri/feed", getFeed);
router.get("/shetagri/:postId", getTextByPostId);
router.post("/shetagri/", postPost);
router.post("/shetagri/modal", sendForm);
router.get("/bytescape/top", getTopCharts);
router.post("/bytescape/title", getByTitle);
module.exports = router;
