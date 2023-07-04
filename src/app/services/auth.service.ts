import { Injectable } from '@angular/core';

import { HttpClient } from  '@angular/common/http'
import { environment } from 'src/environments/environment';

import  { User,  CreateUserDto} from '../models/user.model'
import { Auth } from '../models/auth.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_Url = `${environment.API_URL}/api/auth`
  constructor( private  http: HttpClient ) { }

  private  myProfile = new BehaviorSubject<any>({})
  myProfile$ = this.myProfile.asObservable();

  login(email: string, password:  string){
    return  this.http.post<Auth>(`${this.api_Url}/login`, {email, password})
  }

  profile(token:string){
    return  this.http.get<User>(`${this.api_Url}/profile`, {
      headers: {
         Authorization: `Bearer ${token}`
      }
    })
  }

  setProfile(data:any){
    this.myProfile.next(data)
  }
  
}
