const express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser');
const creds = require('./client_servel_key.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"));
app.use(express.static('public/images'))
app.use(express.static('public/scripts'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'yey',
    resave: false,
    saveUninitialized: true
  }))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', checkUserForAuth, (req, res) => {
    res.render('home')
});

app.get('/weather', checkUserForAuth, (req, res) => {
    res.render('weather')
})

// signup routes
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password
    if(!checkUser(name)){
        addUserDetails(name, email, password)
    } else{
        res.redirect('/signup')
    }

    res.redirect('/signin')
})

// sign in routes

app.get('/signin', (req, res) => {
    res.render('signin')
})

app.post('/signin', async (req, res) => {
    let userDetails = checkUser(req.body.name)
    if(userDetails){
        req.session.user = userDetails;
        res.redirect('/weather')
    } else{
        res.redirect('/signin')
    }
})

app.get('/logout', (req, res) => {
    req.session.user = '';
    res.redirect('/signin')
})

app.listen(3000, () => {
    console.log('servers are on');
})

async function addUserDetails(name, email, password) {
    const scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    const doc = new GoogleSpreadsheet('1c3INiTM0mMFKlo-AG9HEjPgjVowGc6m3m23qjQGf0v8');
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const newRow = await sheet.addRow({name:name, email:email, password:password})
}

async function checkUser(username){
    const scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    const doc = new GoogleSpreadsheet('1c3INiTM0mMFKlo-AG9HEjPgjVowGc6m3m23qjQGf0v8');
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows()
    
    rows.forEach((user, index) => {
        if(user.name === username){
            return rows[index].name
        } else{
            return false
        }
    })
}

function checkUserForAuth(req, res, next){
    if(req.session.user){
        next(); 
    } else{
        res.redirect('/signin')
    }
}