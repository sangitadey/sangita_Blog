const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter=require('./routes/articles')
const methodOverride=require('method-override')
require('dotenv').config();
const app = express()

mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })
    .then(() => console.log("connnection successful"))
    .catch((err) => console.log(err));

app.set('view engine','ejs')
app.use(express.urlencoded({
    extended:false
}))
app.use(methodOverride('_method'))

app.use('/articles',articleRouter);

app.get('/', async (req, res) => {
const articles= await Article.find().sort({
    createdAt:'desc'
})
    
    res.render('articles/index',{ articles:articles })
})







app.listen(process.env.PORT || 3000)