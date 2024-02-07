import { Component, OnInit } from '@angular/core';
import { apiURL } from '../config';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit{

  nomProduit! : string;
  produits! : Produit[];
  allProduits! : Produit[];
  searchTerm!: string;
  
  constructor(
    private produitService: ProduitService
  ){

  }

  ngOnInit(): void {
   // throw new Error('Method not implemented.');

   this.produitService.listeProduit().subscribe(prods => {
    console.log(prods);
    //this.allProduits = prods;  //onkeyup search sans pipe
    this.produits = prods; //onkeyup search avec le pipe
    });
    
  }

  rechercherProds(){
    this.produitService.rechercherParNom(this.nomProduit).
      subscribe(prods => {
        this.produits = prods; 
        console.log(prods);
      });
  }
    

  onKeyUp(filterText : string){
    this.produits = this.allProduits.filter(item =>
    item.nomProduit.toLowerCase().includes(filterText));
  }
}
