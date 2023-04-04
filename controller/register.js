const connection = require('../database/mysqlconnection')

const registered = (req, res) => {
    const data = req.body

    connection.query('INSERT INTO user_data (firstname,lastname,username,email,user_password,gender) VALUES (?,?,?,?,?,?)', [data.firstname, data.lastname, data.username, data.email, data.password, data.gender], (err, result) => {
        if (err) throw err
        res.redirect('/')
    })

}
module.exports = { registered }