const { Router } = require("express");
const PostsController = require("../controller/posts.controller");
const verifyToken = require("../middleware/verifyToken");

const router = Router();

router.use("", verifyToken);
console.log(2222222222222);

router.post('/', PostsController.create)
router.get('/:id', PostsController.detail)
router.get('/', PostsController.list)
router.delete('/:id', PostsController.delete)
router.post('/search', PostsController.search)
// router.patch('/:id', postController.update)

module.exports = router;
