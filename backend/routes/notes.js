const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const bodyParser = require("body-parser");
const NoteController = require("../controllers/notes");
const SharedController = require("../controllers/shared");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(SharedController.Headers);

router.post("", checkAuth, NoteController.createNote);

router.get("", checkAuth, NoteController.getNotes)

router.put("", checkAuth, NoteController.updateNote)

router.delete("",checkAuth, NoteController.deleteNote)


module.exports = router;
