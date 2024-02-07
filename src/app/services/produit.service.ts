import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';

//pour dire que les donnees retourner seront JSON
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

//decorateur pour dire que ce service peut etre injecter dans d'autre class
@Injectable({
  providedIn: 'root'
})
export class ProduitService {


  produits! : Produit[]; //un tableau de produits
  //categories! : Categorie[];
  constructor(
    private http : HttpClient
  ) {

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

  listeProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(apiURL);
  }
    

  /*ajouterProduit( produit: Produit){
    this.produits.push(produit);
  }*/

  ajouterProduit( prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(apiURL, prod, httpOptions);
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

  supprimerProduit(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    }
    

  /*consulterProduit(id:number): Produit{
    return this.produits.find(p => p.idProduit == id)!;;
  }*/

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  /*updateProduit(produit:Produit)
  {
  // console.log(p);
    //this.supprimerProduit(produit);
    this.ajouterProduit(produit);
    this.trierProduits();
  }*/

  updateProduit(prod :Produit) : Observable<Produit>
  {
    return this.http.put<Produit>(apiURL, prod, httpOptions);
  }
    
  trierProduits(){
    this.produits = this.produits.sort((n1,n2) => {
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

  listeCategories():Observable<CategorieWrapper>{
    return this.http.get<CategorieWrapper>(apiURLCat);
    }
    
    rechercherParCategorie(idCat: number):Observable< Produit[]> {
      const url = `${apiURL}/prodscat/${idCat}`;
      return this.http.get<Produit[]>(url);
    }

    rechercherParNom(nom: string):Observable< Produit[]> {
      const url = `${apiURL}/prodsByName/${nom}`;
      return this.http.get<Produit[]>(url);
      }

      ajouterCategorie( cat: Categorie):Observable<Categorie>{
        return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
        }
        
    
}
