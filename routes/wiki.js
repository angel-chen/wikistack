const wiki = require('express').Router();
const routes = require('../views');
const { addPage } = require('../views');
const { Page } = require('../models')

wiki.get('/', (req, res, next) => {
  res.send(routes.main());
})



wiki.post('/', async(req, res, next) => {
  const author = req.body.author;
  const email = req.body.author;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const page = new Page({
    title: title,
    content: content,
    status: status
  });

  try {
      await page.save();
      console.log(page);
      res.redirect('/');
  }
  catch (error) {next(error)}
})

wiki.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = wiki
