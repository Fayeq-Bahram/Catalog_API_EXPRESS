const express = require('express');
const products = require('./data/products');
const categories = require('./data/categories');

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

const PORT = 5001;
app.get('/', (req, res) => {
   res.send(`Server is running on port:${PORT}`);
})

// Using this route you can get all categories
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// Use the following routed to get a single category by ID

app.get('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');
    res.json(category);
});

// Route to add a new category of products

app.post('/api/categories', (req, res) => {
    const newCategory = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// Route to get list of all products

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route to get a single product by ID

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Through this route you can add a new product

app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        categoryId: req.body.categoryId,
        price: req.body.price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
