import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('editForm') editForm: NgForm;
member: Member ;
user : User;
@HostListener('window:beforeunload',['$event']) unloadnotification($event:any)
{
  if(this.editForm.dirty){
    $event.returnValue=true;
  }
}
  constructor(private accountService : AccountService,private memberService:MembersService
  ,private toastr:ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user)
      //console.log(this.user.userName + " " + " constructor hits");
   }

  
   ngOnInit(): void {
    this.loadmember(); 
  }


  loadmember(){
    this.memberService.getMemeber(this.user.userName).subscribe(member=>{    
     this.member=member;
    // console.log(this.member + " " + "load member hits");
      
    })
  }

  updateMember()
  {
   this.memberService.updateMember(this.member).subscribe(()=>{
    this.toastr.success('Save changes suceesfully');
    this.editForm.reset(this.member);
    console.log(this.member + " "+ "updated");
   })
    
  }
  
  }
