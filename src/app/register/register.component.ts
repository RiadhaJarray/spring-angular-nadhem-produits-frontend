import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  public user = new User();

  //confimer password : pour le taper deux fois
  confirmPassword?:string;

  myForm!: FormGroup;
  err!: string;

  loading : boolean= false;

  constructor(
      private authService : AuthService,
      private router :Router,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
    ) {

    }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');

    this.myForm = this.formBuilder.group({
      //Validators : les conditions a valider avant d'envoye le formulaire
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]]
    } );
      
  }

  onRegister()
  {
    console.log("user dans formulaire est : ", this.user);
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
          next:(res)=>{

              //ce ligne est ajouter apres verification token par email
              this.authService.setRegistredUser(this.user);

              this.loading = false;
              //avec toastr
              this.toastr.success('veillez confirmer votre email', 'Confirmation');

              //avant Toastr
              //alert("veillez confirmer votre email");

              this.router.navigate(["/verifEmail"]);
            },
            error:(err:any)=>{
              /*if(err.status=400){
                this.err= err.error.message;
              }*/
              if(err.error.errorCode=="USER_EMAIL_ALREADY_EXISTS")
              this.err="Email already used";
            }
    })      
  }


}
