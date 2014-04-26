if(me.role!=='admin'){
    cancel('You are not authorized to view this page', 401);
}else{
   dpd.users.get(null, null, null,  function(res, err){
    if(res){
        setResult(res);
    }else{
        cancel(err, 500);
    }
   });
  

 
}