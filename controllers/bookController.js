const Book = require("../models/book");

// GET ALL BOOKS
exports.getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });

  res.render("index", {
    books,
    pageTitle: "Home",
  });
};

// SHOW NEW FORM
exports.getNewForm = (req, res) => {
  res.render("new", {
    pageTitle: "Add Book",
  });
};

// CREATE BOOK
exports.createBook = async (req, res) => {
  const { title, author, description } = req.body;
  const coverImage = req.file ? req.file.filename : null;

  await Book.create({
    title,
    author,
    description,
    coverImage,
  });

  res.redirect("/books");
};

// SHOW SINGLE BOOK
exports.getSingleBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  res.render("show", {
    book,
    pageTitle: "View Book",
  });
};

// SHOW EDIT FORM
exports.getEditForm = async (req, res) => {
  const book = await Book.findById(req.params.id);

  res.render("edit", {
    book,
    pageTitle: "Edit Book",
  });
};

// UPDATE BOOK
exports.updateBook = async (req, res) => {
  const { title, author, description } = req.body;

  let updateData = { title, author, description };

  if (req.file) {
    updateData.coverImage = req.file.filename;
  }

  await Book.findByIdAndUpdate(req.params.id, updateData);

  res.redirect("/books");
};

// DELETE BOOK
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);

  res.redirect("/books");
};
