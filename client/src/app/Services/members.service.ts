import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';


// const httpOptions ={
// headers: new HttpHeaders({
// Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token

// })
// }
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl;
  constructor(private httpclient: HttpClient) 
  { 

  }

  getMemebers() 
  {
    return this.httpclient.get<Member[]>(this.baseUrl + 'users');
  }

  getMemeber(username : string) 
  {
    return this.httpclient.get<Member[]>(this.baseUrl + 'users/' + username);
  }
}