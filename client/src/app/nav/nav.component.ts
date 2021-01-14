import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { User } from '../_models/users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any={};

  
//loggedIn:boolean;
//currentUser$:Observable<User>;
constructor(public accountService:AccountService) 
{ 

}

ngOnInit(): void 
{
 // this.getCurrentUser();
 // this.currentUser$=this.accountService.currentUser$;
} 

 login(){
 this.accountService.login(this.model).subscribe(response=> {
     console.log(response);
   
   //  this.loggedIn=true;
   }, error=>{
     console.log(error);
   })
   console.log(this.model);
 }

 
logout(){
  this.accountService.logout();
  //this.loggedIn=false;
}

// getCurrentUser(){
// this.accountService.currentUser$.subscribe(user=>{
//  // this.loggedIn=!!user;
//  this.user=user.username
// }, error=>{
//   console.log(error);
// })
// }
}
