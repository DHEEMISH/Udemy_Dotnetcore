import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
constructor(public accountService:AccountService ,private route:Router,
  private toastr:ToastrService) 
{ 

}

ngOnInit(): void 
{
 // this.getCurrentUser();
 // this.currentUser$=this.accountService.currentUser$;
} 

 login(){
 this.accountService.login(this.model).subscribe(response=> {
    // console.log(response + "test");
   this.route.navigateByUrl('/members');
   //  this.loggedIn=true;
   }, error=>{
     console.log(error);
    // this.toastr.error(error.error);
     
   })
   console.log(this.model);
 }

 
logout(){
  this.accountService.logout();
  this.route.navigateByUrl('/');
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
