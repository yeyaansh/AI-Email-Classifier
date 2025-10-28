import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
const userMiddleware = async (req, res, next) => {
  try {
    console.log(req.cookies)
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: `Token is not present`,
      });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!tokenData) {
      return res.status(401).send({
        success: false,
        message: `Provided token is invalid`,
      });
    }

    // console.log(tokenData)

    const idToken = tokenData._id;

    const isUser = await user.findById({ _id: idToken });

    if (!isUser) {
      return res.status(401).send({
        success: false,
        message: `User doesn't exist in our database`,
      });
    }

    const { _id, emailId, accessToken } = isUser;

    const result = {
      _id,
      emailId,
      accessToken,
    };

    req.result = result;

    next();
  } catch (error) {
    console.error(`Errror in userMiddleware: `, error);
  }
};


export default userMiddleware;