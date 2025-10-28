import axios from "axios";
import { oauth2client } from "../config/googleConfig.js";
import user from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const loginController = () => {
  console.log("/auth/test API is called...");
};

export const googleLoginController = async (req, res) => {
  try {
    const { code } = req.body;

    console.log("code: ", code);
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    console.log("googleRes.token");
    console.log(googleRes.tokens);
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    console.log("userResponse: ");
    console.log(userResponse.data);

    const { email, name, picture } = userResponse.data;

    let userData = await user.findOne({ emailId: email });

    if (!userData) {
      userData = await user.create({
        emailId: email,
        name: name,
        avatar: picture,
        accessToken: googleRes.tokens.access_token,
      });
    }
    console.log(userData);

    userData.accessToken = googleRes.tokens.access_token;
    await userData.save();

    const { _id } = userData;

    const token = jwt.sign(
      {
        _id,
        emailId: userData.emailId,
        token_Created: new Date().toLocaleString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );

    res.cookie("token", token, {
      maxAge: process.env.COOKIE_EXPIRY_TIME,
      httpOnly: true,
    });

    const reply = {
      emailId: email,
      name,
      avatar: picture,
    };

    res.status(200).send({
      reply,
      success: true,
      message: "Account Logged-In Successfully...",
    });
  } catch (error) {
    console.error("Error in googleLoginController: ", error);
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
