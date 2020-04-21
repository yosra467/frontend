import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public router:Router;

  constructor(router:Router,private fb:FormBuilder, private loginService:LoginService, private toastr:ToastrService) {
  this.router=router;
  }

  login(){
    this.loginService.login(this.form.value).subscribe(
      res=>{
        console.log(res);
        const jwt = res.headers.get('Authorization');
        this.loginService.saveToken(jwt);
        this.router.navigateByUrl('');
        
      },
      error=>{
        this.toastr.error('verfier votre mot de passe ou email', 'Erreur !');
      }
    );
  }
  /*public onSubmit(values:Object):void {
      if (this.form.valid) {
          this.router.navigate(['/']);
      }
  }*/

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }
  
  ngOnInit(){
    
    this.form = this.fb.group({
        'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  
  }

}
