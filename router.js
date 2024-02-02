const { Router } = require("express");
const getPosts = require("./getPosts");
const postPost = require("./postPost");
const sendForm = require("./sendForm");
const getFeed = require("./getFeed");
const router = new Router();

router.get("/", getPosts);
router.get("/feed", getFeed);
router.post("/", postPost);
router.post("/modal", sendForm);
module.exports = router;
