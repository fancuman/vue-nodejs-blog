const express = require('express');
const Post = require('../models/post')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const post = await Post.findOne({ _id: req.params.id, autherId: req.user._id })

        if (!post) {
            return res.status(404).send()
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!post) {
            res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

// GET /?limit=10
// GET /?sortBy=createdAt:desc
router.get('/', async (req, res) => {
    const sort = {}


    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        let posts = await Post.find()
        if (req.query.limit)
            posts = await posts.limit(parseInt(req.query.limit))
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            posts = await posts.sort(sort)
        }
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findOne({ _id, authorId: req.user._id })

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router