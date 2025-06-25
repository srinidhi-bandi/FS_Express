import express from 'express';

const app = express();
const port = 3500;

app.use(express.json());
let books = [
    {id: 1, title: "Atomic habbits", author: "James Clear"},
    {id: 2, title: "The Room on the roof", author: "Ruskin Bond"},
];

app.get('/books', (req, res) => {
    res.send(books);
});

app.post('/books', (req,res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    }
    books.push(newBook)
    res.status(201).send(`Book added ${JSON.stringify(newBook)}`)
});

app.put('/books/:id',(req,res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(u => u.id === bookId);

    if (!book){
        return res.status(404).send('Book not found');
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.send(`Book updated: ${JSON.stringify(book)})`);
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(u => u.id === bookId);

    if (index === -1){
        return res.status(404).send('Book not found');
    }

    const deletedBook = books.splice(index, 1);
    res.send(`Book deleted: ${JSON.stringify(deletedBook[0])}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});