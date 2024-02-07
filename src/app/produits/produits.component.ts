import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit{
  

  produits? : Produit[];

  //possibilite de faire injecter le service avec le "new"
  //mais avec cet façon un objet va etre creer avec chaque injection de cet maniere
  //c'est pourquoi on utilise @injectable  : avec l'injection dans le constructeur du componennt qui est besoin du service  
  //private produitService = new ProduitService();


  constructor(
    //injection de la service qui gere le tableau produits
    private produitService: ProduitService,
    public authService: AuthService
  ){
    //possibilite pour initialiser le tableau ddes produits ; ou bien utiliser "?"
    this.produits = [];
  }

  //les instruction dans ngOnInit() seront executer à la creation de l'objet produit apres creation du constructeur
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.produits= this.produitService.listeProduits();

    //listeProduit() retourne un observable donc on doit s'inscrire 
    //le resultat de cet fonction "listeProduit" sera affecter a "prods"

    this.chargerProduits();  
  }

  /*supprimerProduit(prod: Produit)
  {
    console.log(prod);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.produitService.supprimerProduit(prod);
  }*/

  supprimerProduit(p: Produit)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
      console.log("produit supprimé");
      this.chargerProduits();
    });
  } 

  chargerProduits(){
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    }); 
  }

}
