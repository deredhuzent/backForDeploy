
  require('dotenv').config();


const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session = require('express-session');
const passport = require('./handlers/passport');
const cors = require('cors');

mongoose.connect(process.env.PSYCHE_DB, {
  useCreateIndex: true,
  useNewUrlParser: true  
})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

/* session configuration */
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true, 
    resave: true, 
    cookie: {maxAge: 1000 * 60 * 60 * 24}
    /* 1 day */
  })
)

app.use(passport.initialize());
app.use(passport.session());

/* cors configuration */
app.use(
  cors({
  credentials: true,
  origin: true
  // origin: ['http://localhost:3000', 'http://localhost:3001']
}))

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Psyche Portafolios';


//Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const artistsList = require('./routes/artists-list');
const artistInfo = require('./routes/artistInfo');
const projectInfo = require('./routes/projectInfo');
const timelineInfo = require('./routes/timelineInfo');
const upload = require('./routes/uploadImg');


app.use('/', index);
app.use('/auths', auth);
app.use('/list', artistsList);
app.use('/artist', artistInfo);
app.use('/artist/time', timelineInfo);
app.use('/artist/project', projectInfo);
app.use('/upload', upload);

module.exports = app;
