require('dotenv').config()
const express = require('express');
const app = express();

app.use(require('morgan')('dev'))
app.use(express.json());

app.use(express.static('public'))
app.use(require('./routes/userRoutes'))
app.use('/posts',require('./routes/PostRoutes'))

app.use(function (req, res, next) {
    res.status(404).send('404 - Not Found!');
});
app.use(function (err, req, res, next) {
    console.error(err.message)
    res.status(500).send('500 - Something was error!');
});

app.listen(5000, () => {
    console.log('Server started on 5000');
});