const Book = require('../models/books'); 

async function listBooks() {
    return await Book.find(); 
}

async function findBook(id) {
    return await Book.findById(id); 
}

async function createBook(data) {
    const book = new Book(data);
    return await book.save(); 
}

async function updateBook(id, data) {
    return await Book.findByIdAndUpdate(id, data, { new: true }); 
}

async function deleteBook(id) {
    return await Book.findByIdAndRemove(id); 
}

module.exports = {
    listBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook,
};
