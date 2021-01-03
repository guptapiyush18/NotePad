const Note = require("../model/note");

exports.createNote = (req, res, next) => {
  const note = new Note({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description
  })
  note.save().then(createdPost => {
    res.status(201).json({
      message: 'Update successfull',
      note: createdPost
    })
  })
}

exports.getNotes = (req, res, next) => {

  if (req.query.id) {
    Note.findOne({ _id: req.query.id, userId: req.userData.userId }).then((document => {
      res.status(200).json({
        note: document
      })
    }))
  }
  else {
    Note.find({ userId: req.userData.userId }).then(documents => {
      res.status(200).json({
        notes: documents
      })
    })
  }

}

exports.updateNote = (req, res, next) => {
  if (req.query.id) {
    const note = new Note({
      _id: req.body.id,
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description
    });
    Note.updateOne({ _id: req.query.id }, note).then((data) => {
      res.status(200).json({ "message": "Post Updated" });
    })
  }
}

exports.deleteNote = (req, res, next) => {
  const id = req.query.id;
  Note.deleteOne({ _id: id }).then(result => {
    res.status(200).json({
      message: 'Post Deleted Successfully'
    })
  })
}
