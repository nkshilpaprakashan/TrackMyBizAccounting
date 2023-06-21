const mongoose=require('mongoose')

/********************Connection setUp of mongoose Driver**************************/ 
function mongodb(){
 
        mongoose.connect(process.env.MONGO_URL,{    
        useNewUrlParser:true,
        useUnifiedTopology:true
        },(err)=>{
        if(err){
            console.log('Not Connected')
            console.log(err)
        }else{
            console.log('Connection Successful')
        }
    })
   
}


module.exports=mongodb