const wiki = require("express").Router();
const routes = require("../views");
const { addPage, editPage, main, userList, userPages, wikiPage } = require("../views");
const { Page, User } = require("../models");

wiki.get("/", async (req, res, next) => {
try {
  const pages = await Page.findAll()
  res.send(routes.main(pages));
} catch(error) { next(error) }
});

wiki.post("/", async (req, res, next) => {
  const author = req.body.author;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const page = new Page({
    title: title,
    content: content,
    status: status
  });

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: author,
        email: email
      }
    })

    await page.save();
    page.setAuthor(user);
    console.log(page);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wiki.get("/add", (req, res, next) => {
  res.send(addPage());
});

wiki.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(routes.wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = wiki;
