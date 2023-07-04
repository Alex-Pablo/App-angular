import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { environment } from 'src/environments/environment';

import  { User,  CreateUserDto} from '../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api_Url = `${environment.API_URL}/api/users`
  constructor( private  http: HttpClient ) { }


create(dto: CreateUserDto){
  return  this.http.post<User>(this.api_Url, dto)
}

getAll(){
  return  this.http.get<User[]>(this.api_Url)
}


}
