import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'MesProduits';

  constructor(
    public authService: AuthService,
    private router :Router
  ){

  }


  //version avnt jwt 
  /*
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    let isloggedin: string;
    let loggedUser:string;
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    if (isloggedin!="true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }*/

  ngOnInit () : void {
    this.authService.loadToken();
    if (this.authService.getToken()==null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
  }
    
  

  onLogout() {
    //throw new Error('Method not implemented.');
    this.authService.logout();
  }
}
