const express = require('express');
const router = express.Router();
const Note = require("../model/note");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb+srv://admin:asdasdasd@angularnode.ovhei.mongodb.net/notesDB?retryWrites=true&w=majority").then(() => {
  console.log("Connected to database!");
})
  .catch(() => {
    console.log("Connection failed!");
  });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

router.post("", (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    description: req.body.description
  })
  note.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Update successfull',
      note: createdPost
    })
  })
});

router.get("", (req, res, next) => {
  Note.find().then(documents => {
    res.status(200).json({
      notes: documents
    })
  })

})


module.exports = router;
