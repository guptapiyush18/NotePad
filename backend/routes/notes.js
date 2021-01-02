const express = require('express');
const router = express.Router();
const Note = require("../model/note");
const bodyParser = require("body-parser");


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
  if (req.query.id) {
    Note.findOne({ _id: req.query.id }).then((document => {
      res.status(200).json({
        note: document
      })
    }))
  }
  else {
    Note.find().then(documents => {
    res.status(200).json({
      notes: documents
    })
  })}

})

router.put("", (req, res, next) => {
  if (req.query.id) {
    const note = new Note({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description
    });
    Note.updateOne({ _id: req.query.id }, note).then((data) => {
      res.status(200).json({ "message": "Post Updated" });
    })
}
})

router.delete("", (req, res, next) => {
  const id = req.query.id;
  Note.deleteOne({ _id: id }).then(result => {
    res.status(200).json({
      message: 'Post Deleted Successfully'
    })
  })
})


module.exports = router;
