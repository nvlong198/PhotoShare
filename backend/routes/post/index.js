const newPostRouter = require("./new_post");
const bookmarkRouter = require("./bookmark");
const postsRouter = require("./posts");
const postReactionRouter = require("./reaction");
const privacyRouter = require("./privacy");
const feedRouter = require("./feed");
const postDetailRouter = require("./post_detail");
const {getNewRouter} = require("./base");

const router = getNewRouter();

router.use("/posts", [newPostRouter, postDetailRouter, postReactionRouter, privacyRouter]);
router.use("/", [postsRouter]);
router.use("/bookmark", bookmarkRouter);
router.use("/feed", [feedRouter]);

module.exports = router;