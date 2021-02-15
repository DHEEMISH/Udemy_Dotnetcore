import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/users';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
member: Member ;
user : User;
  constructor(private accountService : AccountService,private memberService:MembersService) {
   this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user)
   console.log(this.member + " " + " constructor hits");
   }

  ngOnInit(): void {
    this.loadmember(); 
  }


  loadmember()
  {
    this.memberService.getMemeber(this.user.username).subscribe(member=>{
     
     this.member=member;
     console.log(this.member + " " + "load member hits");
      
    }) 
   
   }
  
  }
