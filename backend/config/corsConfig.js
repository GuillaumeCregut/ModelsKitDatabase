const corsOptions ={
    // origin:process.env.CLIENT_URL,  
    origin: true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }

  module.exports=corsOptions;

  //Another way :

 /*
 //Should be an array of allowad sites, just to change method to test origin
  corsOptions={
    origin:(origin,callback)=>{
      if(origin==='http://192.168.1.20:3000')
        callback(null,true)
      else
        callback(new Error('Not allowed'));
    },
    optionSuccessStatus:200,
  }*/