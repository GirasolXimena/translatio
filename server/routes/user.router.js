const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const multer = require('multer')
const router = express.Router();
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const storage = multer.diskStorage({
  destination: '../photos',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
      
      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });  
  }
})
const upload = multer({ storage: storage });

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('get in user router', req.user);
  
  // Send back user object from database
  res.send(req.user);
});

router.get('/profile', (req, res) => {
  console.log('getting profile');
  const queryText = `
  SELECT * FROM "Users";`

  pool.query(queryText)
  .then((result) => {
    console.log(result.rows);
    console.log(result.rows);
    
    res.send(result.rows)})
  .catch(err => res.send(err))
})

// router.post('/profile', (req, res, next) => {
  // console.log('posting pic', req.body);
  
  // const queryText = `
  // UPDATE "Users"
  // SET profile_pic = $1
  // WHERE id=($2);
  // `;
  // pool.query(queryText, [req.body, 2])
  // .then(() => { res.sendStatus(201); })
  // .catch((err) => { next(err); });

  router.post('/profile', upload.single('avatar'), (req, res) => {
    console.log('posting pic');
    console.log(req.body);
    
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  });
// })

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('register req: ', req.body);
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const account_type = req.body.account_type;

  const queryText = 'INSERT INTO person (username, password, account_type) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, account_type])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});
router.post('/userData', (req, res, next) => {
  console.log('req: ', req.body);
  
  const birthdate = req.body.birthdate;
  const email = req.body.email;
  const name = req.body.name;
  const nativeLang = req.body.nativeLang;
  const targetLang = req.body.targetLang;


  const queryText = `
  INSERT INTO "Users"
  (birthdate, email, name, nat_lang, for_lang) 
  VALUES ($1, $2, $3, $4, $5)`;
  pool.query(queryText, [birthdate, email, name, nativeLang, targetLang])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
