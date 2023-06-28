import express,{Response, Request } from'express';
const router = express.Router();
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from '../controller/postsController';
import { auth } from '../middlewares/auth';

// Create a new post
router.post('/posts',auth, createPost);

// Get all posts
router.get('/posts',auth, getAllPosts);

// Get a single post by ID
router.get('/posts/:id', getPostById);

// Update a post by ID
router.put('/posts/:id', updatePost);

// Delete a post by ID
router.delete('/posts/:id', deletePost);

export default router;
