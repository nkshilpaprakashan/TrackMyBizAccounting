const jwt=require('jsonwebtoken')

 const userVerifyToken=(req,res,next)=>{

    const userToken=req.cookies.userToken
    

    if(userToken){
        jwt.verify(userToken,'MySecretKeyUser',(err,decoded)=>{
            console.log("abc");
            console.log(decoded);
            if(err){
                console.log(err);
               
                res.json({userTokenVerified:false})
            }else{
                console.log('Token Verified');
                next()
            }
        })
    }else{
        
        res.json({userTokenVerified:false})
    }
}


module.exports=userVerifyToken;