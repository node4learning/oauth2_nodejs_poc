const auth = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

auth.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/oauth/github/callback', 
    },
    function(accessToken, refreshToken, profile, done){
        console.log(profile);
        return done(null, profile);
      }
  ));

auth.serializeUser((user, done) => {
    console.log(user.displayName);
  done(null, user);
});

auth.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = auth;
