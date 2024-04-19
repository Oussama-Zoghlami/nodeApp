import User from "../models/user.js";
import bcrypt from "bcrypt";
import blacklist from "../models/blacklist.js";

export async function Register(req, res) {

    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
        });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message:"Email Already in Use",
        });

        const savedUser = await newUser.save();
        const { role, ...user_data } = savedUser._doc;
        console.log("user saved");
        res.redirect("/login");
    }catch(e) {
        console.log(e);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message:"Database Error",
        });
    }
}

export async function Login(req, res) {
    const { email,  password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password.",
            });

        const isPasswordValid = await bcrypt.compare(password,user.password);
        // if not valid, return unathorized response
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });

        let options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        const token = user.generateAccessJWT();
        console.log("Login successful");
        res.cookie("SessionID", token, options);
        res.redirect("/src/user");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}

export async function Logout(req, res) {
    try {
      const authHeader = req.headers['cookie']; // get the session cookie from request header
      if (!authHeader) return res.sendStatus(204); // No content
      const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
      const accessToken = cookie.split(';')[0];
      const checkIfBlacklisted = await blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
      // if true, send a no content response.
      if (checkIfBlacklisted) return res.sendStatus(204);
      // otherwise blacklist token
      const newBlacklist = new blacklist({
        token: accessToken,
      });
      await newBlacklist.save();
      // Also clear request cookie on client
      res.setHeader('Clear-Site-Data', '"cookies"');
      res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
    res.end();
  }

  