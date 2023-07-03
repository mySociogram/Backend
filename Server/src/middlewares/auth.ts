import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET!;

// if (!JWT_SECRET) {
//   throw new Error('JWT secret key is not defined');
// }

// export async function auth(req: Request | any, res: Response, next: NextFunction): Promise<unknown> {
//   try {
//     const authorizationHeader = req.headers.authorization;

//     if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ Error: 'Kindly login as a user' });
//     }

//     const token = authorizationHeader.split(" ")[1];
//     console.log(token, "token")

//     if (!token) {
//       return res.status(401).json({ Error: 'Kindly login as a user' });
//     }

//     let verified: { id: string } | null = null;
//     try {
//       verified = jwt.verify(token, JWT_SECRET) as { id: string } | null;
//       console.log(verified, "verified")
//     } catch (error) {
//       return res.status(401).json({ Error: "Token not valid" });
//     }

//     if (!verified) {
//       return res.status(401).json({ Error: "Invalid token, you are not authorized to access this route" });
//     }

//     const { id } = verified;

//     // Find user by id
//     const user = await User.findOne({ where: { id } });

//     if (!user) {
//       return res.status(401).json({ Error: "Kindly login correct details as a user" });
//     }

//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(401).json({ Error: "User not authenticated, please login first." });
//   }
// }

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader, "authorization");
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized:  Kindly connect wallet" });
  }

  const token = authorizationHeader.split(" ")[1].trim();
  console.log(token, "token");
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  const { walletId } = decodedToken as unknown as { walletId: string };
  console.log(walletId, "walletId auth");
  try {
    const user = await User.findOne({ where: { walletId } });
    if (!user) {
      return res.status(401).json({
        error: "Kindly connect wallet as a user",
      });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(401).json({ error: "Internal server error" });
  }
}

// try {
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.substring(7);

//     if (!token) {
//       return sendErrorResponse(res, 401, 'Kindly sign in as a user');
//     }

//     let verifiedUser;

//     try {
//       verifiedUser = jwt.verify(token, jwtsecret);
//       console.log(verifiedUser);

//     } catch (error) {
//       return sendErrorResponse(res, 401, 'Invalid token');
//     }

//     const { email } = verifiedUser as { email: string };

//     try {
//       const user = await User.findOne({ where: { email } });

//       if (!user) {
//         return sendErrorResponse(
//           res,
//           401,
//           'Kindly register or sign in as a user',
//         );
//       }

//       req.user = verifiedUser;
//       next();
//     } catch (error) {
//       console.error('Error finding user:', error);
//       return sendErrorResponse(res, 500, 'Internal server error');
//     }
//   }
// } catch (error) {
//   console.error('Error in user authentication middleware:', error);
//   return sendErrorResponse(res, 500, 'Internal server error');
// }
// };
