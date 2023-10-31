import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  formAuth: FormGroup
  msgerro: string = "";

 constructor( private formBuilder : FormBuilder,
               private authService: AuthService){
     this.formAuth = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]]
      });

  }

  ngOnInit(): void {
  }

  public submitForm(){
    if(this.formAuth.valid){
      this.authService.sign({
        email: this.formAuth.value.email,
        password: this.formAuth.value.password
      }).subscribe({
        next: (res) => res,
        error: (err) => (this.msgerro = err),
      })
    }
  }

}
