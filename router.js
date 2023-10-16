const { Router } = require("express");
const getPosts = require("./getPosts");
const router = new Router();

router.get("/", getPosts);
module.exports = router;
