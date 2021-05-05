const jwt = require("jsonwebtoken");
const { User } = require("../models");

// const ValidateJWTMiddleware = (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   } else if (
//     req.headers.authorization &&
//     req.headers.authorization.includes("Bearer")
//   ) {
//     const { authorization } = req.headers;
//     const payload = authorization
//       ? jwt.verify(
//           authorization.includes("Bearer")
//             ? authorization.split(" ")[1]
//             : authorization,
//           process.env.JWT_SECRET
//         )
//       : undefined;
//     if (payload) {
//       User.findOne({
//         where: {
//           id: payload.id,
//         },
//       }).then((user) => {
//         req.user = user;
//         next();
//       });
//     } else {
//       res.status(401).json({
//         message: "Not allowed",
//       });
//     }
//   } else {
//     res.status(401).json({
//       message: "Not allowed",
//     });
//   }
// };
// module.exports = ValidateJWTMiddleware;

const validateSession = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next()
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers
        const payload = authorization
          ? jwt.verify(
              authorization.includes("Bearer")
                ? authorization.split(" ")[1]
                : authorization,
              process.env.JWT_SECRET
            )
          : undefined
        //   console.log(payload)

        if (payload) {
            const foundUser = await User.findOne({ where: { id: payload.id } })
            if (foundUser) {
                req.user = foundUser
                next()
            } else {
                res.status(400).send({ message: "Not Authorized" })
            }
        } else {
            res.status(401).send({ message: "Invalid token" })
        }
    } else {
        res.status(403).send({ message: "Forbidden" })
    }
}

module.exports = validateSession