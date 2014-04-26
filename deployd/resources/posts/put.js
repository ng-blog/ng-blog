if(this.uid !==me.id && me.role!=='admin'){
    cancel('Not Authorized to update post', 400);
}