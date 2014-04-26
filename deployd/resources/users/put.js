//if we're not doing a pw reset
    //if the logged in user is not an admin
    if(!internal){
        if(me.role!=="admin"){
        //and the logged in user is not editing their own user profile
        if (!isMe(this.id)){
            //throw an error...
            cancel('Not Authorized to update this user', 503); 
        }
      } 
    }
    




