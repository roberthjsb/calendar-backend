const jwt = require('jsonwebtoken');

const generaJWT = (uid, name)=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid,name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED,
            {expiresIn:'2h'} ,
            (err, token)=>{
                console.log('callback......')
                console.log(err,token)
                if(err){
                    console.log(err)
                    reject('No se pudo generar token')
                }
                resolve(token)
                console.log('Resolve....')
            }
        )
    });    
}
module.exports={
    generaJWT
}