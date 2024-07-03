export interface NewUserRequestbody {
  name: string;
  email: string;
  photo: string;
  dob: Date;
  gender: string;
  _id: string;
}

export interface NewProductRequestbody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type searchRequestQuery={
  search?:string,
  price?:string,
  category?:string,
  sort?:string,
  page?:string
}

export   interface baseQuery{
  name?: {
    $regex: string,
    $options: string,
  },
  price?: { $lte:number },
  category:string
}