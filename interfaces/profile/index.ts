export interface userr{
    otherSub: Array<string>,
  Isub: Array<string>,
  posts: post[],
  information: string,
  avatar: string,
  isActive: boolean,
  forreset: string,
  confirm: string,
  _id: string,
  email: string,
  name: string,
  surename: string,
}
export interface post{
    likes:string[],
    coments:string[],
    _id:string,
    imageUrl:string
}