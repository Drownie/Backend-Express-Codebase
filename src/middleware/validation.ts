// This is middleware for validate request token etc.

// import { Request, Response, NextFunction } from "express";
// import { FirebaseService } from "../external/firebase";
// // import { ErrorMessageEnum } from "../utils";

// export async function validateAuthorization(req: Request, res: Response, next: NextFunction) {
//     try {
//         let header = req.headers;
//         let authorization = header.authorization;
//         if (!authorization) {
//             throw ErrorMessageEnum.NO_AUTHORIZATION_TOKEN;
//         }

//         let decodedToken = await FirebaseService.getService().validateIdToken(authorization);
//         req.headers.uid = decodedToken.uid;
//         next()
//     } catch(err: any) {
//         if (err.code === 'auth/id-token-expired') {
//             next(new Error(ErrorMessageEnum.TOKEN_EXPIRED));
//         }
//         next(new Error(ErrorMessageEnum.AUTHENTICATION_ERROR));
//     }
// }