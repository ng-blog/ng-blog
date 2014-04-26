//Only admins can add users...
if(me.role!=="admin"){
    cancel('Not Authorized to create user', 400);
}

  
