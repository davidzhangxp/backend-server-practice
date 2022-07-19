const express = require("express");
const router = express.Router();

const { News, validate } = require("../models/news");
const { route } = require("./register");

router.get("/", async (req, res) => {
  const news = await News.find();
  res.send(news);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const news = new News(req.body);
  await news.save();
  res.send(news);
});

router.patch("/addComment/:id", async (req, res) => {
  const news = await News.find({ _id: req.params.id });
  if (!news.length) {
    return res.status(404).send(JSON.stringify("Story not found."));
  }

  const query = { _id: req.params.id };
  const update = {
    $push: {
      comment: {
        publisherName: req.body.publisherName,
        content: {
          image: req.body.content.image,
          video: req.body.content.video,
          text: req.body.content.text,
        },
      },
    },
  };
  const options = { upsert: false };
  await News.updateOne(query, update, options)
    .then((result) => {
      // console.log(result);
      const { matchedCount, modifiedCount } = result;
      if (matchedCount && modifiedCount) {
        console.log(`Successfully added a new comment.`);
      }
    })
    .catch((err) => console.error(`Failed to add comment: ${err}`));

  const newsupdated = (await News.find(query))[0];
  const comment = newsupdated.comment[newsupdated.comment.length - 1];

  res.send(comment);
});

module.exports = router;
