const Book = require("../models/bookModel");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
