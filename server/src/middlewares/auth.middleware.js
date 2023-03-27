const { noAccess } = require("../utils/data");

/**
 * vérifie l'existence de la session et les permissions
 * avant d'autoriser l'accès ou non à l'utilisateur
 * si la session n'est pas valide ou que les permissions sont
 * insuffisantes une erreur 403 est retournée
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const hasAccess = (req, res, next) => {
  try {
    if (
      req.session &&
      (req.session.roles.includes("tech") ||
        req.session.roles.includes("admin"))
    ) {
      next();
    } else {
      res.status(403).json({ noAccess });
    }
  } catch (error) {
    res.status(403).json({ noAccess });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.session && req.session.roles.includes("admin")) {
      next();
    } else {
      res.status(403).json({ noAccess });
    }
  } catch (error) {
    res.status(403).json({ noAccess });
  }
};
module.exports = { hasAccess, isAdmin };
