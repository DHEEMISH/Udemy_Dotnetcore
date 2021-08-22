import { templateJitUrl } from '@angular/compiler';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
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
  registerform:FormGroup;
  constructor(private accountService : AccountService,private toastr:ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
this.registerform = this.fb.group({
  gender:['male'],
  username:['',Validators.required],
  KnownAs:['',Validators.required],
  dateofBirth:['',Validators.required],
  city:['',Validators.required],
  country:['',Validators.required],
  password:['',[Validators.maxLength(8)
  ,Validators.minLength(4),Validators.required]],
  confirmPassword:['',[Validators.required,this.matchValues('password'
  )]]
})
  this.registerform.controls.password.valueChanges.subscribe(()=>{

    this.registerform.controls.confirmPassword.updateValueAndValidity();
  }
  
  )

console.log(this.registerform);
  }

  matchValues(matchTo:string):ValidatorFn{
return (control:AbstractControl)=>{
  return control?.value===control?.parent?.controls[matchTo].value
?null :{isMatching:true}
}
}
  
  register(){
    console.log(this.registerform.value);
    // this.accountService.register(this.model).subscribe(response=>{
    //   console.log(response);
     
    //   this.cancel();
    // },error=>{(
    // console.log(error));
    // this.toastr.error(error.error);
    // console.log(this.model);
    // })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log(this.model);
  }
}
