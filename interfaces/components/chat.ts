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
export interface messagetype{
    _id:string
    romId:string
    text: string; 
    senter:roomuser
    secnt:roomuser
    createdAt: Date; 
    likes:roomuser[]
}