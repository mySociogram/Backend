import { Request, Response } from 'express';
import Post, { PostAttributes } from '../models/postModel';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, userId, body, images, communityId, likes,flags, comments }: PostAttributes = req.body;
    const post = await Post.create({ title, userId, body, images, communityId,likes,flags,comments });
    return res.status(201).json({ message: "Post created successfully", data: post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create posts', data: error });
  }
};


// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await Post.findAll();
      return res.status(200).json({ message: "Post fetched successfully", data: posts });
    } catch (error) {
      console.error('Error getting posts:', error);
      res.status(500).json({ message: 'Failed to get posts', data: error });
    }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found", data: null });
      }
      res.json({ post });
    } catch (error) {
      console.error('Error getting post:', error);
      res.status(500).json({ message: 'Failed to get post', data: error });
    }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found", data: null });
      }
      const { title, userId, body, images }: PostAttributes = req.body;
      await post.update({ title, userId, body, images });
      return res.status(200).json({ message: "Post updated successfully", data: post });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Failed to update post', data: error });
    }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found", data: null });
      }
      await post.destroy();
      return res.status(200).json({ message: "Post deleted successfully", data: post });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Failed to delete post', data: error });
    }
};