import express,{Response, Request } from'express';
const router = express.Router();


router.get('/', function(req:Request, res:Response) {
  res.send('respond with a resource');
});

export default router;
