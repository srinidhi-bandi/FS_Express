import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());
let products = [
    {id: 1, name : 'rice', price: 100, stock: 10},
    {id: 2, name : 'ponds', price : 80, stock: 20},
    {id: 3, name: 'chocolate', price: 120, stock: 15}
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.post('/products', (req,res) => {
    const { name, price, stock } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        stock
    }
    products.push(newProduct)
    res.status(201).send(`Product added ${JSON.stringify(newProduct)}`)
});

app.put('/products/:id',(req,res) => {
    const productId = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const product = products.find(u => u.id === productId);

    if (!product){
        return res.status(404).send('User not found');
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    res.send(`Product updated: ${JSON.stringify(product)})`);
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(u => u.id === productId);

    if (index === -1){
        return res.status(404).send('User not found');
    }

    const deletedProduct = products.splice(index, 1);
    res.send(`Product deleted: ${JSON.stringify(deletedProduct[0])}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});