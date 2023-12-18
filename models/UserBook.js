const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['borrowed', 'returned']
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  returnDate: Date
});

const UserBook = mongoose.model('UserBook', userBookSchema);

module.exports = UserBook;
