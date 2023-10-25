const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors())


const PORT = process.env.PORT || 5000;
const catagories = require('./data/categories.json')
const news = require('./data/news.json')

app.get('/api/categories', (req, res) => {
    res.json(catagories)
})

app.get('/api/news', (req, res) => {
    res.json(news)
})
app.get('/api/news/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    let selectedNews = news.find(n => n._id == id)
    res.json(selectedNews)

})
app.get('/api/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0) {
        res.json(news)
    } else {
        const categoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.json(categoryNews)
    }
})


app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})