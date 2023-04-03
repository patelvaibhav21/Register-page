const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))


const staticPath=__dirname+'/public'
app.use(express.static(staticPath))
// All middlewares and handlers
const { check_field } = require('./middleware/allvalidation')
const { registered } = require('./controller/register')
const { auth } = require('./middleware/auth_user')







app.get('/', (req, res) => {
    let message;
    res.render('login_page', { message })
})

app.get('/register', (req, res) => {
    res.render('register_page', { err: '' })
})

app.post('/register', check_field, registered)

app.post('/home', auth, (req,res)=>{
    res.render('home')
})

app.get('*',(req,res)=>{
    res.sendFile(staticPath+'/404_page.html')
})


app.listen(4000, () => {
    console.log('Server is running.........')
})