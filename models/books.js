const express = require('express');
const router = express.Router();
const UserBook = require('../models/UserBook');




router.get('/check-borrow/:userId/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;

   
    const borrowedBooks = await UserBook.find({ userId, status: 'borrowed' });

    if (borrowedBooks.length > 0) {
      res.status(200).json({ message: 'User has borrowed books', borrowedBooks });
    } else {
      res.status(200).json({ message: 'User has not borrowed any books' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking borrowed books', error: error.message });
  }
});



router.get('/check-return/:userBookId', async (req, res) => {
  try {
    const { userBookId } = req.params;

    const userBook = await UserBook.findById(userBookId);

    if (userBook && userBook.status === 'returned') {
      res.status(200).json({ message: 'User has returned the book.' });
    } else {
      res.status(200).json({ message: 'User has not returned the book.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking book status', error: error.message });
  }
});



module.exports = router;
