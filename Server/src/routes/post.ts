import express,{Response, Request } from'express';
const router = express.Router();
import User from '../model/userModel';
router.get('/post', async function(req:Request, res:Response) {
  const checker = await User.findAll()
  console.log(checker)
  res.render('index', { title: 'Express' });
  
});

export default router;
