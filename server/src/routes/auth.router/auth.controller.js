const jwt = require("jsonwebtoken");

const {
  login,
  getConseillerById,
} = require("../../models/auth.model/login.model");
const {
  regexMail,
  regexPassword,
  credentialsError,
  serverIssue,
  noAccess,
} = require("../../utils/data");

//  authentification de l'utilisateur
async function httpLogin(req, res) {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    !regexMail.test(username) ||
    !regexPassword.test(password)
  ) {
    return res.status(401).json({ credentialsError });
  }
  const user = await login(username, password);
  try {
    if (!user.isValid) {
      return res.status(401).json({ credentialsError });
    }
    if (user.roles.includes("tech") || user.roles.includes("admin")) {
      req.session.userId = user.id;
      req.session.roles = user.roles;
      return res.status(200).json({
        user: {
          username: user.username,
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          roles: user.roles,
          createdAt: user.createdAt,
        },
      });
    } else {
      return res.status(403).json({ noAccess });
    }
  } catch (error) {
    return res.status(500).json({ error: serverIssue + error });
  }
}

function httpLogout(req, res) {
  req.session.destroy((err) => {
    console.log(err);
  });
  return res.status(200).json({ message: "logged out" });
}

async function httpHandShake(req, res) {
  try {
    const user = await getConseillerById(req.session.userId);
    if (user.roles.includes("tech") || user.roles.includes("admin")) {
      return res.status(200).json({
        user: {
          username: user.username,
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          roles: user.roles,
          createdAt: user.createdAt,
        },
      });
    }
    return res.status(403).json({ message: noAccess });
  } catch (error) {
    return res.status(500).json({ error: serverIssue + error });
  }
}

module.exports = { httpHandShake, httpLogin, httpLogout };
