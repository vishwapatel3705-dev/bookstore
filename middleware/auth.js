const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;

    // no cookie → redirect
    if (!userId) {
      return res.redirect("/signin");
    }

    // check if user actually exists
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/signin");
    }

    // optionally store user (useful later)
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.redirect("/signin");
  }
};
