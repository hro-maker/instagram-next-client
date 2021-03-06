
import { posttype } from './';
export interface roomtype{

    _id:string,
    romusers:roomuser[],
    users:string,
    createdAt:Date,
    updatedAt:Date,
    last?:{
        senter: string
        text: string
        type: string
        _id: string
    },
    count:number
}
export interface roomuser{
    _id:string,
     name:string,
      surename:string
       avatar:string
       isActive:boolean
       lastvisite:Date
}
export enum messageenum{
        message='message',
        audio='audio',
        image='image',
        post='post'
}
export interface messagetype{
    _id:string
    romId:string
    text: string; 
    senter:roomuser
    secnt:roomuser
    createdAt: Date; 
    likes:roomuser[]
    images:string[]
    type:messageenum
    post:posttype
}