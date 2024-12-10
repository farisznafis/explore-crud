const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// make books dummy data
let books = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3'
    },
];

// get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// get book by id
app.get('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('Book not found');
    }
    res.json(book);
});

// Endpoint: Menambahkan buku baru
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint: Memperbarui buku
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

// Endpoint: Menghapus buku
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.status(200).json({ message: "Book deleted" });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});