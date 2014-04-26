if(me.role==='admin'){
  dpd.users.put(body.id, body, function(result, error){
         
         if(error){
             cancel("Error, unable to uppdate", 400);
         }
    });
}else{
     cancel('Not authorized to update this user',404);
}
