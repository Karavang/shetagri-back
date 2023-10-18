const { Router } = require("express");
const getPosts = require("./getPosts");
const postPost = require("./postPost");
const router = new Router();

router.get("/", getPosts);
router.post("/", postPost);
module.exports = router;
