function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

if(me.role==="admin"){
     
    //create new password
   var newpw = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    body.password=newpw;
    var questions=[{"question":"Who is your hero", "answer":"ng-blog"}, {"question":"What is your favorite front-end framework", "answer":"angularjs"}];
    body.questions = questions;
    //save new password
    dpd.users.post(null, body, function(res, err){
        if(err===null){
            //email new password
                dpd.email.post({
                    to      : body.email,
                    subject : 'Account Created',
                    text    : [
                    "An administrator has created an account for you",
                    "username:"+body.username,
                    "password:"+newpw,
                    "Please login and upate your password. You also need to setup your password recovery questions.",
                    "Default questions and answers have been created for you. If not changed bad guys can change your password!"
                    
                    ].join('\n')
                }, function (result, err ) {
                    //console.log(result, err);
                });  
            
        }
    });
                  
}else{
    cancel('You are not Authorized to do this', 400);
}
