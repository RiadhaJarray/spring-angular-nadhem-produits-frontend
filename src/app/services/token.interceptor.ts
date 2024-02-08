import {  HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService : AuthService = inject(AuthService);
  const toExclude = "/login";
  //tester s'il sagit de login, on n'ajoute pas le header Authorization 
  //puisqu'on a pas encore de JWT (il est null)
  if(req.url.search(toExclude) === -1){
    let jwt = authService.getToken();
    let reqWithToken = req.clone( {
      setHeaders: { Authorization : "Bearer "+jwt}
    })
    //url with token
    return next(reqWithToken);
  }
  //url without token
  return next(req);

};
