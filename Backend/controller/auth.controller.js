const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const register = async(req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        console.log(salt);
        const hashPassword = await bcrypt.hash(password,salt)
        console.log(hashPassword);
        
        const createdUser = await userModel.create({
            username,
            password:hashPassword
        })
        if (!createdUser) return res.status(400).json({ error: "error" });
        res.status(200).json({user:createdUser})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

// controllers/userController.js


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

      const user = await userModel.findOne({ username });
      console.log(user);
      if (!user) {
           return res.status(401).json({ error: "Invalid credentials",authorize:false });
    }
      
    const matchPassword = await bcrypt.compare(password, user?.password)
    if (!matchPassword) {
    return res.status(401).json({ error: "Invalid credentials",authorize:false });
  }

    // 🔑 Create JWT
    const token = jwt.sign(
      { id: user.id },
      "secretkey", // move to .env in real apps
      { expiresIn: "1d" }
    );

    // 🍪 Send cookie
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true,  
      sameSite: "none",
    });

    res.json({
        message: "Login successful",
        authorize:true,
      user: { id: user.id },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const isAuth = (req, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ authorize: false });
      res.status(200).json({ authorize: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {register,loginUser,logoutUser,logoutUser,isAuth}