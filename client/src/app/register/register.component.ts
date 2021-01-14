import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AccountService } from '../Services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//@Input() usersFromHomeComponent:any;
@Output() cancelRegister=new EventEmitter();
  model : any ={};
  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response=>{
      console.log(response);
      this.cancel();
    },error=>
    console.log(error))
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log(this.model);
  }
}
