const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./views/index');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const PORT = 3000;

app.use('/', (req, res) => {
  res.send(routes.main());
})

const init = async(req, res) => {
  await db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
}

init();

db.authenticate().
then(() => {
  console.log('connected to the database');
})
