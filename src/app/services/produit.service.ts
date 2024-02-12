import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

//pour dire que les donnees retourner seront JSON
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

//decorateur pour dire que ce service peut etre injecter dans d'autre class
@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[]; //un tableau de produits
  //categories! : Categorie[];
  constructor(private http: HttpClient, private authService: AuthService) {
    /*this.categories=[
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ];*/

    //nous avons utiliser cet affichege pour montrer la creation d'un novelle instance de produit service avec chaque utilisation lorsque nou avons utiliser injection par constructerur "new"
    //avec @Injectable : une suel instance de l'objet produit.service est crée et utilise par toute l'application
    console.log("creation de l'objet prosuit service!!");
    /*this.produits = [
      {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, 
        dateCreation : new Date("01/14/2011"), categorie : {idCat : 1, nomCat : "PC"}},
      {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, 
        dateCreation : new Date("12/17/2010"), categorie : {idCat : 2, nomCat : "Imprimante"}},
      {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, 
        dateCreation : new Date("02/20/2020"), categorie : {idCat : 1, nomCat : "PC"}}
    ];*/
  }

  /*listeProduits() : Produit[] {
    return this.produits;
  }*/

  //version avant jwt
  /*listeProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(apiURL);
  }*/

  listeProduit(): Observable<Produit[]> {
    //version sans interceptor
    /*
      //recuperation du token
      let jwt = this.authService.getToken();
      //ajout du prefix
      jwt = "Bearer "+jwt;
      //ajouter le jwt a l'appel du api dans le headers avec cle "Authorization"
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<Produit[]>(apiURL+"/all",{headers:httpHeaders});
      */

    //avec interceptor
    return this.http.get<Produit[]>(apiURL + '/all');
  }

  /*ajouterProduit( produit: Produit){
    this.produits.push(produit);
  }*/

  //version avant jwt
  /*ajouterProduit( prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(apiURL, prod, httpOptions);
  }*/

  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    console.log(JSON.stringify(prod));
    return this.http.post<Produit>(apiURL + '/addprod', prod, {
      headers: httpHeaders,
    });
  }

  /*supprimerProduit( prod: Produit){
    //supprimer le produit prod du tableau produits
    const index = this.produits.indexOf(prod, 0);
    if (index > -1) {
      this.produits.splice(index, 1);
    }*/
  //ou Bien
  /* this.produits.forEach((cur, index) => {
      if(prod.idProduit === cur.idProduit) {
        this.produits.splice(index, 1);
      }
    }); */
  // }

  //version avant jwt
  /*supprimerProduit(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    }*/

  supprimerProduit(id: number) {
    const url = `${apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  /*consulterProduit(id:number): Produit{
    return this.produits.find(p => p.idProduit == id)!;;
  }*/

  //version avant jwt
  /*consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }*/

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  /*updateProduit(produit:Produit)
  {
  // console.log(p);
    //this.supprimerProduit(produit);
    this.ajouterProduit(produit);
    this.trierProduits();
  }*/

  //version avant jwt
  /*updateProduit(prod :Produit) : Observable<Produit>
  {
    return this.http.put<Produit>(apiURL, prod, httpOptions);
  }*/

  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Produit>(apiURL + '/updateprod', prod, {
      headers: httpHeaders,
    });
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit! > n2.idProduit!) {
        return 1;
      }
      if (n1.idProduit! < n2.idProduit!) {
        return -1;
      }
      return 0;
    });
  }

  /* listeCategories():Categorie[] {
    return this.categories;
  }

  consulterCategorie(id:number): Categorie{ 
    return this.categories.find(cat => cat.idCat == id)!;
  }*/

  /*listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(apiURL+"/cat");
  }*/

  //version avant jwt
  /*listeCategories():Observable<CategorieWrapper>{
    return this.http.get<CategorieWrapper>(apiURLCat);
    }*/

  listeCategories(): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<CategorieWrapper>(apiURLCat, { headers: httpHeaders });
  }

  /*rechercherParCategorie(idCat: number):Observable< Produit[]> {
      const url = `${apiURL}/prodscat/${idCat}`;
      return this.http.get<Produit[]>(url);
    }*/

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url, { headers: httpHeaders });
    //return this.http.get<Produit[]>(url);
  }

  /**rechercherParNom(nom: string):Observable< Produit[]> {
      const url = `${apiURL}/prodsByName/${nom}`;
      return this.http.get<Produit[]>(url);
      }*/

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  /* ajouterCategorie( cat: Categorie):Observable<Categorie>{
        return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
        }*/

  ajouterCategorie(cat: Categorie): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<CategorieWrapper>(apiURLCat, cat, {
      headers: httpHeaders,
    });
    //return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idProd:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
    }

    supprimerImage(id : number) {
      const url = `${apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }
      
}
