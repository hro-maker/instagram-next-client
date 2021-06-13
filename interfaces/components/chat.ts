export interface roomtype{
    _id:string,
    romusers:roomuser[],
    users:string,
    createdAt:Date,
    updatedAt:Date
}
export interface roomuser{
    _id:string,
     name:string,
      surename:string
       avatar:string
}