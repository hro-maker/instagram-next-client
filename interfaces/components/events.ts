export enum eventenum {
  like = "like",
  follow = "follow",
  comment = "comment",
}

export interface eventtype {
  createdAt: Date;
  object: string;
  post: {
    imageUrl: string;
    _id: string;
  };
  readed: boolean;
  subject: {
    avatar: string;
    name: string;
    _id: string;
  };
  type: eventenum;
  _id: string;
  comment:string
}
