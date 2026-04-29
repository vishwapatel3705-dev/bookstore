const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const isLoggedIn = require("../middleware/auth");

// =======================
// DEFAULT ENTRY
// =======================
router.get("/", (req, res) => {
  if (!req.cookies.userId) {
    return res.redirect("/signin");
  }
  return res.redirect("/books");
});

// =======================
// AUTH ROUTES (PUBLIC)
// =======================
router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "Signup" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { pageTitle: "Signin" });
});

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);

// =======================
// PROTECTED ROUTES
// =======================
router.use(isLoggedIn);

// HOME
router.get("/books", bookController.getAllBooks);

// CREATE
router.get("/new", bookController.getNewForm);
router.post("/books", upload.single("coverImage"), bookController.createBook);

// READ
router.get("/books/:id", bookController.getSingleBook);

// UPDATE
router.get("/books/:id/edit", bookController.getEditForm);
router.put(
  "/books/:id",
  upload.single("coverImage"),
  bookController.updateBook,
);

// DELETE
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
