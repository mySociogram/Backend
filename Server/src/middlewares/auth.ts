import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET!;


export const auth = (req:any, res: any, next: any) => {
  const token = req.cookies['token']
  if (!token) {
      req.authenticated = true
      req.status = 403
      return res.status(403).json('login', {error: 'Please login as a user'})
  
  } else {
      let validator = jwt.verify(token, jwtsecret!)

      if (validator) {
        req.user=validator
        
          return next()
      } else {
          
          req.status = 403
         return res.status(403).json('login', {error: 'Invalid token'})
      
      }
  }
  
}