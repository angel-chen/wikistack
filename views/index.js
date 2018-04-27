const router = require('express').Router();
const addPage = require("./addPage");
const editPage = require("./editPage");
const main = require("./main");
const userList = require("./userList");
const userPages = require("./userPages");
const wikiPage = require("./wikiPage");

//original middleware for main route
// router.get('/', (req, res) => {
//   res.send(main())
// })

module.exports = { addPage, editPage, main, userList, userPages, wikiPage };
