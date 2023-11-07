const { Router } = require("express");
const getPosts = require("./getPosts");
const postPost = require("./postPost");
const sendForm = require("./sendForm");
const router = new Router();

router.get("/", getPosts);
router.post("/", postPost);
router.post("/modal", sendForm);
module.exports = router;
