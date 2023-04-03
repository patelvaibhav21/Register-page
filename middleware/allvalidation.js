const connection = require('../database/mysqlconnection')



const check_field = (req, res, next) => {
    let data=req.body
    //password  validation
    if (data.password != data.re_enter_password) {
        res.render('register_page', { err: "oppps!! password doesn't match" })
    }
    // password length validation
    else if(data.password.length<5) {
        res.render('register_page', { err: "Password is too short" })
    }
    // username validation
    else{
 
    connection.query(`SELECT username FROM user_data WHERE username=?`,[data.username],(error,result)=>{
        if(error) throw error
        console.log(result)
        if(result.length!=0){
            res.render('register_page',{err:'Username already taken'})
        }else{
            next()
        }

    })}
   
}
module.exports={check_field}