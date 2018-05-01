const user = require('express').Router();
const routes = require('../views/index');
const { addPage, editPage, main, userList, userPages, wikiPage } = require("../views");
const { Page, User } = require("../models");

user.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users))
  }catch(error) { next(error) }
})

user.get('/:id', async (req, res, next) => {
  try {
    const user = await User.FindById(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.id
      }
    })
    res.send(routes.userPage(user))
  } catch(error) { next(error) }
})


module.exports = user
