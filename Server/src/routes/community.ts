import express,{Response, Request } from'express';
const router = express.Router();


router.get('/community', function(req:Request, res:Response) {
  res.render('index', { title: 'Express' });
});

export default router;