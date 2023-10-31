import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
  }

  public logout(){
    console.log('clickou')
    this.authService.logout();
  }

}