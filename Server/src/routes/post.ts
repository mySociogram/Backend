import express,{Response, Request } from'express';
const router = express.Router();
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from '../controller/postsController';

// Create a new post
router.post('/posts', createPost);

// Get all posts
router.get('/posts', getAllPosts);

// Get a single post by ID
router.get('/posts/:id', getPostById);

// Update a post by ID
router.put('/posts/:id', updatePost);

// Delete a post by ID
router.delete('/posts/:id', deletePost);

export default router;
