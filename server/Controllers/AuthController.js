import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  const { email } = req.body;

  try {
    const isUserAvailable = await UserModel.findOne({ username });
    const isEmailAvailable = await UserModel.findOne({ email });

    if (isUserAvailable) {
      return res.status(400).json({ message: "Username already in use" });
    }

    if (isEmailAvailable) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await newUser.save();

    const token = JWT.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        res.status(400).json("Wrong password");
      } else {
        const token = JWT.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
