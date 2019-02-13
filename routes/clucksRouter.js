const express = require("express");
const knex = require("../db/client");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("clucks/new");
});

router.post("/", (req, res) => {
  const newCluck = req.body;
  console.log(newCluck);
  knex("clucks")
    .insert({
      username: newCluck.username,
      image_url: newCluck.image_url,
      content: newCluck.content,
      id: newCluck.id,
      created_at: newCluck.created_at
    })
    .returning("*")
    .then(() => {
			res.redirect(`/clucks/`);
		});
});

router.get("/", (req, res) => {
  knex("clucks")
    .orderBy("created_at", "desc")
    .then(clucks => {
      res.render("clucks/index", { clucks: clucks });
    });
});

module.exports = router;