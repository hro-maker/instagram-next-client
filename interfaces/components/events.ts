export enum eventenum{
    like="like",
    follow="follow"
}

export interface eventtype{
    createdAt: Date
object: string
post:{
imageUrl: string
_id: string}
readed: false
subject:{
avatar: string
name: string
_id: string}
type: eventenum
_id: string
}