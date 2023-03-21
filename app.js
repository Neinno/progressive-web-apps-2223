const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


app.use(express.static("public"));

const { engine } = require("express-handlebars");
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const artRouter = require('./routes/art');
app.use('/', artRouter);