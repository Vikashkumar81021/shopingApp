export interface NewUserRequestbody{
    name:string,
    email:string,
    photo:string,
    dob:Date,
   
    gender:string,
    _id:string
}

export interface NewProductRequestbody{
    name:string,
    category:string,
  price:number,
  stock:number
}