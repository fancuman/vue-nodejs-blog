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

// GET /tasks?limit=10
// GET /tasks?sortBy=createdAt:desc
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
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})