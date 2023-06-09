import { Request, Response } from 'express';
import { JwtPayload } from "jsonwebtoken";
import Comment from "../models/commentModel";
import { v4 as uuidv4 } from "uuid";
import Post from "../models/postModel";
import User from "../models/userModel";

// export const createComment = async (req: JwtPayload, res: Response) => {
//     try{
//         const id = uuidv4();
        
//         const userId = req.user.id
//         const {postId, comment} = req.body;

//         const post = await Post.findOne({
//             where: {
//                 id: postId
//             }
//         });
//         if (!post){
//             return res.status(400).json({message: "post does not exist"})
//         }
//         const newComment = await Comment.create({
//             id,
//             postId: postId,
//             userId: userId,
//             comment,
//             like: [],
//         });
//         await Post.increment(['comment'], { by: 1, where: { id: postId }});
//         res.status(201).json({comment: newComment});
        
//     }catch(err){
//         console.error('Error creating comment', err);
//         res.status(500).json({Error: 'Failed to create comment'});
//     }
// };


export const fetchComments = async (req: Request, res: Response) => {
    try {
      const { postId, pageNumber, pageSize }: any = req.query;
      const comments = await Comment.findAll({
        where: {
          postId: postId,
        },
        limit: pageSize,
        offset: pageNumber,
        include: {
          model: User,
          attributes: ['id', 'walletId']
        },
      });
  
      res.json({ comments });
    } catch (err) {
      console.error('Error fetching comments', err);
      res.status(500).json({ Error: 'Failed to fetch comments' });
    }
  }
  

  
  export const likeComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
  
    try {
      const likedComment = await Comment.findOne({ where: { id: id } });
      if (!likedComment) {
        return res.status(400).json({ message: 'Comment not found' });
      }
      const likeArr: string[] = [...likedComment.like];
      let updatedLikeArr: string[];
      if (likeArr.includes(userId)) {
        updatedLikeArr = likeArr.filter((item) => item !== userId);
      } else {
        updatedLikeArr = [...likeArr, userId];
      }
      await likedComment.update({ like: [...updatedLikeArr] });
      return res.status(200).json({ likedComment });
    } catch (error) {
      return res.status(500).json(error);
    }
  };


  export const editComment = async(req: Request, res: Response)=>{
try {
    
} catch (error) {
    return res.status(500).json(error);
}
  }


//   export const replyComment =async (req: Request, res: Response) => {
//     try {
        
//     } catch (error) {
        
//     }
//   }

// export const deleteComment = async (req: JwtPayload, res: Response) => {
//     const {commentId} = req.params;
//     const userId = req.user.id
//     console.log(commentId);
//     console.log(userId);

//     const comment:Comment | any = await Comment.findOne({
//         where: {
//             id: commentId,
//             userId: userId
//         }
//     })
//     if(comment){
//         Comment.destroy({
//             where: {
//                 id: commentId,
//                 userId: userId
//             }
//         })
//         await Post.decrement('comment', { by: 1, where: { id: comment.post_id }});
//         res.status(201).json({message: "comment deleted successfully"});
//     } else {
//         res.status(400).json({Error: 'cannot  delete comment'})
//     }

// }