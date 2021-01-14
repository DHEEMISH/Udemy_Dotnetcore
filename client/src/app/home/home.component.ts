import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userUrl='https://localhost:5001/api/Users';
  // users:any;
  registerMode=false;

  constructor() { }

  ngOnInit(): void {
   // this.getUsers();
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
   // false=!false-true;
  }
  // getUsers()
  // {
  //   this.http.get('https://localhost:5001/api/users').subscribe(users => this.users = users);
  // }
  cancelRegistermode(event:boolean)
  {
    this.registerMode=event;
  }
}
