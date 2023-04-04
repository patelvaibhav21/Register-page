const connection = require('../database/mysqlconnection')

const auth = (req, res, next) => {
    let data = req.body
    
    connection.query('SELECT username ,user_password FROM user_data WHERE username=? AND user_password=?', [data.username, data.password], (err, result) => {
        if(err) throw err
        if(result.length==0){
            res.redirect('/')
        }else{
            req.session.isAuth=true
            next()
        }

    })


}
module.exports={auth}