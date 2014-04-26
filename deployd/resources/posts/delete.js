if(this.uid !==me.id && me.role!=="admin"){
    cancel('Not Authorized to delete post', 400);
}