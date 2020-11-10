var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var users = {};
const { handlebars } = require('hbs');

// database connection
require('./config/db');
require('dotenv').config();

passport.serializeUser(function(user, done) {
  users[user.profile.oid] = user;
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id, done) {
  done(null, users[id]);
});

const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_PASSWORD
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT
  }
});

async function signInComplete(iss, sub, profile, accessToken, refreshToken, params, done) {
  if (!profile.oid) {
    return done(new Error("No OID found in user profile."));
  }

  try{
    const user = await graph.getUserDetails(accessToken);

    if (user) {
      profile['email'] = user.mail ? user.mail : user.userPrincipalName;
      profile['office'] = user.officeLocation ? user.officeLocation : user.officeLocation;
      profile['job'] = user.jobTitle ? user.jobTitle : user.jobTitle;
      profile['_id'] = user.id ? user.id : user.id;
    }
  } catch (err) {
    return done(err);
  }

  let oauthToken = oauth2.accessToken.create(params);

  users[profile.oid] = { profile, oauthToken };
  return done(null, users[profile.oid]);
}

passport.use(new OIDCStrategy(
  {
    identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
    clientID: process.env.OAUTH_APP_ID,
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: process.env.OAUTH_REDIRECT_URI,
    allowHttpForRedirectUrl: true,
    clientSecret: process.env.OAUTH_APP_PASSWORD,
    validateIssuer: false,
    passReqToCallback: false,
    scope: process.env.OAUTH_SCOPES.split(' ')
  },
  signInComplete
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var skillsGSCRouter = require('./routes/skills');
var graph = require('./API/graph');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

app.use(flash());

app.use(function(req, res, next) {
  res.locals.error = req.flash('error_msg');

  var errs = req.flash('error');
  for (var i in errs){
    res.locals.error.push({message: 'An error occurred', debug: errs[i]});
  }

  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

handlebars.registerHelper('media', function(avalue, bvalue, cvalue, dvalue, evalue) {
   return media = (avalue + bvalue + cvalue + dvalue + evalue)/5;
});

/*handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

  if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
      '==':       function(l,r) { return l == r; },
      '===':      function(l,r) { return l === r; },
      '!=':       function(l,r) { return l != r; },
      '<':        function(l,r) { return l < r; },
      '>':        function(l,r) { return l > r; },
      '<=':       function(l,r) { return l <= r; },
      '>=':       function(l,r) { return l >= r; },
      '!':        function(l,r) { return l, r >= 3; },
      'typeof':   function(l,r) { return typeof l == r; }
  }

  if (!operators[operator])
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

  var result = operators[operator](lvalue,rvalue);

  if( result ) {
      return options.fn(this);
  } else {
      return options.inverse(this);
  }

}); */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/index', indexRouter);
app.use('/skills', skillsGSCRouter);

//catch 404 
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
