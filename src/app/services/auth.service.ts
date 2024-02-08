import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiURL, apiURLLogin } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 /* users: User[] = [
    {"username":"admin","password":"123","roles":['ADMIN']},
    {"username":"riadh","password":"123","roles":['USER']} 
  ];*/

  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  token!:string;

  private helper = new JwtHelperService();


  constructor(
    private router :Router,
    private http : HttpClient
  ) { 

  }

  /*SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if(user.username== curUser.username && user.password==curUser.password) {
        validUser = true;

        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;

        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

 
  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1);
  }
   
//version avant token
  /*logout() {
    this.isloggedIn= false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    this.router.navigate(['/login']);
  }*/

  //version avec token
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    }
    
    
  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  /*getUserRoles(username :string){
    this.users.forEach((curUser) => {
      if( curUser.username == username ) {
        this.roles = curUser.roles;
      }
    });
  }*/

  //retourne la reponse apres demande de login
  login(user : User)
  {
    return this.http.post<User>(apiURLLogin+'/login', user , {observe:'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true; 
    this.decodeJWT();
  }

  getToken():string {
    return this.token;
  }

  decodeJWT()
  { 
    //si pas de token je quite
    if (this.token == undefined)
      return;

    //decoder le token pour extraire les information
    const decodedToken = this.helper.decodeToken(this.token);
    //recuperer le claim roles creer en backend qui est un liste des roles[string]
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean
  {
    return this.helper.isTokenExpired(this.token); 
  }

    
}
