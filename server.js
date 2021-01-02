const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./backend/routes/notes');
const noteRoutes = require('./backend/routes/notes');

mongoose.connect("mongodb+srv://admin:asdasdasd@angularnode.ovhei.mongodb.net/notesDB?retryWrites=true&w=majority").then(() => {
  console.log("Connected to database!");
})
  .catch(() => {
    console.log("Connection failed!");
  });
app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static('./dist/NotePad'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/NotePad' }
  );
});
app.listen(process.env.PORT || 8080);
