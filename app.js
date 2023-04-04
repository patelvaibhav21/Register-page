const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')
app.use(cookieparser())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
const session = require('express-session')

const staticPath = __dirname + '/public'
app.use(express.static(staticPath))
// All middlewares and handlers
const { check_field } = require('./middleware/allvalidation')
const { registered } = require('./controller/register')
const { auth } = require('./middleware/auth_user')

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));





app.get('/', (req, res) => {
    let message;
    res.cookie('username', 'cookiename from server')
    res.render('login_page', { message })
   
})

app.get('/register', (req, res) => {
    res.render('register_page', { err: '' })
})


app.get('/home/:username', (req, res) => {
     
    if (req.session.isAuth == true) {
        res.render('home',req.params)
    } else {
        res.redirect('/')
    }
})
app.get('/about/:username', (req, res) => {
    res.render('about_page',req.params)
})

app.post('/register', check_field, registered)

app.post('/home', auth, (req, res) => {
    res.redirect(`/home/${req.body.username}`)
})

app.get('/logout', (req, res) => {
    req.session.isAuth = false
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.sendFile(staticPath + '/404_page.html')
})

app.listen(4000, () => {
    console.log('Server is running.........')
})