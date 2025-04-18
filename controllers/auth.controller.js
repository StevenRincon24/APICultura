import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { tokenAcceso } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config.js";

export const registro = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const userFound = await User.findOne({ username });

    if (userFound)
      return res.status(400).json(["Ya existe un usuario con ese nombre"]);
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    const usuarioguardado = await newUser.save();
    const token = await tokenAcceso({ id: usuarioguardado._id });

    res.cookie("token", token);
    res.json({
      id: usuarioguardado._id,
      username: usuarioguardado.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res
        .status(404)
        .json(["Usuario no encontrado, intente nuevamente"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(404).json(["Datos invalidos,  intente nuevamente"]);

    const token = await tokenAcceso({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60,
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.sendStatus(400).json({ message: "User not found " });

  return res.json({
    id: userFound._id,
    username: userFound.username,
  });
  console.log(req.user);
  res.send("PROFILE");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Sin Token de acceso!" });

  jwt.verify(token, TOKEN_SECRET_KEY, async (err, user) => {
    if (err)
      return res.status(401).json({ message: "Sin autorizacion de Token" });

    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(401).json({ message: "Sin autorizacion" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
    });
  });
};
