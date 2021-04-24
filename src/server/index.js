const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
//const os = require('os');


const app = express();

const bankRoute = require('./routes/bank.routes')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/',bankRoute);

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${process.env.PORT || 5000}!`));
