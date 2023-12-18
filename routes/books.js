const express = require('express');
const { listBooks, findBook, createBook, updateBook, deleteBook } = require('../services/booksService'); // Update with actual service file path
const router = express.Router();

router.get('/books', async (req, res, next) => {
    try {
        const books = await listBooks();
        res.json(books);
    } catch (error) {
        next(error);
    }
});

router.get('/books/:id', async (req, res, next) => {
    try {
        const book = await findBook(req.params.id);
        if (!book) return res.status(404).send('Book not found.');
        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.post('/books', async (req, res, next) => {
    try {
        const newBook = await createBook(req.body);
        res.status(201).send(newBook);
    } catch (error) {
        next(error);
    }
});

router.put('/books/:id', async (req, res, next) => {
    try {
        const updatedBook = await updateBook(req.params.id, req.body);
        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
});

router.delete('/books/:id', async (req, res, next) => {
    try {
        await deleteBook(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = router;
