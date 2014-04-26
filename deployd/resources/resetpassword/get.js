function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
 
dpd.users.get(null, null, query, function(result, error){
    if(result.length > 0){
        //We are checking a submitted answer...
        if(query.answer){
            var ans_arr = query.answer.split("_");
            var ans_idx = parseInt(ans_arr[0], 10);
            var answer = ans_arr[1];
           if(result[0].questions[ans_idx].answer===answer){
               
                //create new password
                var newpw = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                result[0].password=newpw;
                //save new password
                dpd.users.put(result[0].id, result[0], function(res, err){
               
                });
                
                //email new password
                dpd.email.post({
                    to      : query.email,
                    subject : 'Password Reset',
                    text    : [
                    "Your new password is",
                    newpw,
                    'Please login and upate your password'
                    ].join('\n')
                }, function (result, err ) {
                    //console.log(result, err);
                });
                
                
                
            }else{ cancel('Wrong Answer', 404); }
            
        //We are checking to see if user exists...
        }else{
           var data =[]; 
          data.push(result[0].questions[0].question);
          data.push(result[0].questions[1].question);
        
          setResult(data);
        
        }
        
    }else{
        cancel('User not found', 404);
    }
});