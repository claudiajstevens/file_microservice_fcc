var express = require('express');
var cors = require('cors');
require('dotenv').config()

//added
const bodyParser = require('body-parser');
var multer = require('multer');
const upload = multer({dest:'uploads/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({extended: true}));

//You can submit a form that includes a file upload.
//The form file input field has the name attribute set to upfile.
//When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }catch(err) {
    res.send(400);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
