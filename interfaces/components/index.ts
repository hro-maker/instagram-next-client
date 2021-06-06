export interface sliderinterface {
  slider: number;
}
export interface error {
  email?: string;
  password?: string;
  name?: string;
  surename?: string;
  code?: string;
  confirm?: string;
}
export interface valuess {
  email?: string;
  password?: string;
  name?: string;
  surename?: string;
  confirm?: string;
}
export const loginvalues = {
  email: "",
  password: "",
};

export const registervalues = {
  email: "",
  password: "",
  name: "",
  surename: "",
};

export const loginlabels = {
  email: "Email form",
  password: "Password",
};
export const registerlabels = {
  email: "Email form",
  password: "Password",
  name: "firstname",
  surename: "lastname",
};
export interface resetpassword {
  userId: string;
  password: string;
  forreset: string;
}
export interface posttype {
  _id: string;
  imageUrl: string;
  coments: Array<comenttype>;
  description: string;
  createdAt: Date;
  likes: string[];
  user: {
    name: string;
    surename: string;
    _id: string;
    avatar: string;
  };
}
export interface comenttype {
  createdAt: string | number | Date;
  likes?: any[];
  parentId?: string;
  postId?: string;
  text?: string;
  updatedAt?: any;
  userId?: {
    avatar?: string;
    name?: string;
    surename?: string;
    _id?: string;
  };
  _id: string;
}
