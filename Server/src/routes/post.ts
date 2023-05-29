import express,{Response, Request } from'express';
const router = express.Router();


router.get('/post', function(req:Request, res:Response) {
  res.render('index', { title: 'Express' });
});

export default router;
