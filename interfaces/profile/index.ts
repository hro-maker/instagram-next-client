export interface userr{
    otherSub: Array<string>,
  Isub: Array<string>,
  posts: postinterface[],
  information: string,
  avatar: string,
  isActive: boolean,
  forreset: string,
  confirm: string,
  _id: string,
  saved:any[],
  email: string,
  name: string,
  surename: string,
}
export interface postinterface{
  createdAt:Date
    likes:string[],
    coments:string[],
    _id:string,
    imageUrl:string
}