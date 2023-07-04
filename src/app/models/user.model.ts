
export  interface  User{
  id: String,
  email: String,
  password:  String
  name:string
}


export  interface CreateUserDto  extends Omit<User, 'id'> {}
