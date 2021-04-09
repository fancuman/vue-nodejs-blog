const express = require('express');
const Post = require('../models/post')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')

const router = express.Router();

//postId
router.post('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findOne({ _id })

        if (!post) {
            return res.status(404).send("Post doesn't exist")
        }

        const comment = new Comment({
            ...req.body,
            authorId: req.user._id,
            postId: _id
        })

        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

//commentId
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const comment = await Comment.findOne({ _id: req.params.id, authorId: req.user._id })

        if (!comment) {
            return res.status(404).send()
        }

        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

//postId
router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const comments = await Comment.find({ postId: _id, authorId: req.user._id })

        if (!comments) {
            return res.status(404).send()
        }

        res.send(comments)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router