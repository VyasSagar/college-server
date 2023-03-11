const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')


const app = express();

app.use(cors())
app.use(bodyParser.json());
var connectString = 'mongodb+srv://<username>:<password>@<clusterURL>/<dbname>';
mongoose.connect( connectString, { useNewUrlParser: true, useUnifiedTopology: true });

const MyModel = mongoose.model('collegecollection ', {
  name: String,
  subject: String,
  email: String,
  slot: String,
});

const classlistmodel = mongoose.model('collegecollection', {
  name: String,
  subject: String,
  email: String,
  slot: String,
});


app.post('/createclass', (req, res) => {
  const data = new MyModel(req.body);
  data.save().then(() => {
    res.json({ status: 'ok' });
  });
});

app.get('/getallclasses', (req, res) => {
  MyModel.find({}, function(err, results){
    if (err) throw err;
    const objects = [];
    results.forEach(function(doc) {
      objects.push(doc.toObject());
    });
    res.send(objects);
});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
