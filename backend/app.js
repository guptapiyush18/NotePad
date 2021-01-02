const express = require('express');
const app = express();
const noteRoutes = require('./routes/notes');

app.use('/api/notes', noteRoutes);
app.use(express.static('./dist/NotePad'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/NotePad' }
  );
});
module.exports = app;
