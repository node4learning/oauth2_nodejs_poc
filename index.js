const express = require('express');
const session = require('express-session');
const auth=require('./auth.js');
const app = express();


const String=require('randomstring');
const secretKey=String.generate({ length: 10, charset: 'alphanumeric' })

console.log(secretKey);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(auth.initialize());
app.use(auth.session());

app.get('/home',(req,res)=>{
    res.send('Welcome to homepage <a href="/oauth/github/callback">Log in with Github</a>');
})

app.get(
  '/oauth/github/callback',
  auth.authenticate('github'),
  (req, res) => {
    res.send(`Hello, Thanks for signing in! <a href="/logout">Logout</a>`);
  }
);

app.get('/logout', (req, res) => {
  req.logout((err)=>{
    if(err)
    {
        console.log('error');
    }
  res.redirect('/home');
})
});

const port =5000;
app.listen(port, () => {
  console.log("Running");
});
