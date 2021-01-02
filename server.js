const express = require('express');
const app = express();
const noteRoutes = require('./backend/routes/notes');

app.use('/api/notes', noteRoutes);
app.use(express.static('./dist/NotePad'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/NotePad' }
  );
});
app.listen(process.env.PORT || 8080);
