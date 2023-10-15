
const throwError = require("../middleware/throwError");
const Posts = require("../models/posts.model");
class PostController {

    async create(req, res, next) {
        try {
            if (req.body.title === "" && req.body.content == "") return next(throwError(400, "Not Be Empty"))
            if (req.body.title.length > 100) return next(throwError("400", "Invalid Title"))
            const newPosts = new Posts({ userId: req.user._id, ...req.body })
            const savedPosts = await newPosts.save();
            res.status(200).json(savedPosts);
        } catch (error) {
            next(error);
        }
    }

    async detail(req, res, next) {
        try {
            const findPosts = await Posts.findOne({ _id: req.params.id, userId: req.user._id });
            console.log(findPosts);
            if (!findPosts) return next(throwError(404, " Post Not Found"))
            res.status(200).json(findPosts);
        } catch (error) {
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const listPosts = await Posts.find({ userId: req.user._id }).sort({ createdAt: -1 })
            if (!listPosts) return next(throwError(404, "Post Not Found"))
            res.status(200).json(listPosts);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) next(throwError(404, "Id Not Found"))
            const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
            if (!deletedPost) next(throwError(404, "Post Not Found"));
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) return next(throwError(404, "Id Not Found"));
            const updatedPost = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { ...req.body },
            );
            if (!updatedPost) return next(throwError(404, "Post Not Found"));
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async search(req, res, next) {
        try {
            const textSearchTitle = req.body.text
            if (!textSearchTitle) return next(throwError(400, "Content Search Not To Be Empty"))
            const keySearch = textSearchTitle.trim().split(" ")
            const listPosts = await Posts.find({
                userId: req.user._id,
                $or: keySearch.map(keyword => ({ title: { $regex: keyword, $options: 'i' } }))
            }).sort({ createdAt: -1 });
            if (!listPosts) return next(throwError(404, "Not Found"))
            res.status(200).json(listPosts);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController()
