const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();

// using body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// using dotenv
require('dotenv').config({ path: './config/.env' })
const URL = process.env.MONGODB_URI.toString();
const PORT = process.env.PORT;

// setting templating engineapp.engine('.hbs', exphbs({helpers:{ formatDate, indexing }, defaultLayout: 'main', extname: '.hbs'}));
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// connecting to db and starting the server
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    app.listen(PORT, console.log(`Server running on port ${PORT} and DB is connected as Well!!! `))
}).catch((err)=>{
    console.log('Error: ', err.message);
})

// using cokie parser
app.use(cookieParser());

// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/teacherDashboard', require('./routes/teacherDashboard'));
app.use('/api', require('./routes/api'));
