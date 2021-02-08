import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { MembersService } from 'src/app/Services/members.service';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {

  members: Member[];
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadmembers();
  }

  loadmembers()
  {
    this.memberService.getMemebers().subscribe(members=>{
      this.members=members;
    })
  }
}
