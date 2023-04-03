// var y='dfb'
// if(y){
//     console.log('okk')

// }else{
//     console.log('elsse')
// }
// let status = 'not Logged in'

// if (status = 'registered') {
//     message = 'Registred successfully........'
// } else {
//     message = ''
// }

// Callback function
const jwt=require('jsonwebtoken')


const user={
    name:'abc',
    password:'12345678'
}
  

  
const token1=jwt.sign({user},'secretkey',(err,token)=>{

    console.log('Token generated ::',token)
    const verify=jwt.verify(token,'secretkey')
    console.log(verify)
})

