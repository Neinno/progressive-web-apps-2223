const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const { engine } = require("express-handlebars");
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const artRouter = require('./routes/art');
app.use('/', artRouter);

const detailRouter = require('./routes/artdetail');
app.use('/artwork', detailRouter);


const searchRouter = require('./routes/artsearch');
app.use('/search', searchRouter);
