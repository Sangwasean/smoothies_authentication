const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const authRoutes = require('./routes/authRouters');
const {requireAuth, checkUser}=require('./middlewares/authMiddlewares');
const res = require('express/lib/response');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8000;
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
  mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .catch((err) => {
    console.log(err);
  })
  .then((result)=>{
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
console.log("database connected");
  });



// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});