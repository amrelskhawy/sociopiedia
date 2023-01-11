import express from "express";

import Post from "../models/Post.js";
import User from "../models/User.js";
Post
export default class PostsClass {

    // CREATE
    async createPost(req, res) {
        try {
            const { userId, description, picturePath } = req.body;
            const user = await User.findById(userId)
            const newPost = new Post({
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description: description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            })

            await newPost.save()

            const post = await Post.find();
            res.status(201).json(post)
        } catch (error) {
            res.status(409).send({ message: error.message })
        }
    }
    async getFeedPosts(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts)
        } catch (error) {
            res.status(409).send({ message: error.message })
        }
    }

    async getUserPosts(req, res) {

        const { userId } = req.body

        const post = await Post.find({ userId });
        res.status(200).json(post)
    }
    async likePosts(req, res) { 
        const { id } = req.params
        const { userId } = req.body

        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId,true)
        }
        const updatedPost = await Post.findByIdAndUpdate(id,
            { likes: post.likes },
            { new: true })
        res.status(200).json(updatedPost)
    }
}