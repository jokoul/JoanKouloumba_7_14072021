const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.TOKEN_SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${secretKey}`);
    const userId = decodedToken.userId;
    if (req.body.user_id && req.body.user_id !== userId) {
      throw "User ID is invalid ! Unauthenticated request !";
    } else {
      next();
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error || "Unauthenticated request ! Invalid user_Id !" });
  }
};
