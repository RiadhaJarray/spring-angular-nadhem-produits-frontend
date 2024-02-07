import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html'
})
export class UpdateProduitComponent implements OnInit{

  categories! : Categorie[];
  updatedCatId! : number;
  
  currentProduit = new Produit();
  
  constructor(
    //injection des dependances
    private activatedRoute: ActivatedRoute,
    private router :Router, //pour faire la navigation entre page (route)
    private produitService: ProduitService
  ){

  }
 
  ngOnInit(): void {
    //chargement de tout les categories
    //this.categories = this.produitService.listeCategories();
    this.produitService.listeCategories().
    subscribe(cats => {
      //this.categories = cats;
      this.categories = cats._embedded.categories;
      console.log(cats);
    });

    //throw new Error('Method not implemented.');
    //console.log(this.activatedRoute);
    //console.log(this.activatedRoute.snapshot.params['id']);
    //this.currentProduit = this.produitService.consulterProduit(this.activatedRoute.snapshot. params['id']);//avant observable 
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe( prod =>{ 
        this.currentProduit = prod; 
        this.updatedCatId = this.currentProduit.categorie.idCat;

      } ) ;

    console.log(this.currentProduit);
    //initialisation de la categorie du produit choisit pour modifier
    ///this.updatedCatId=this.currentProduit.categorie.idCat;
  }

  /*updateProduit() {
    //throw new Error('Method not implemented.');

    //console.log(this.currentProduit);
    //this.currentProduit.categorie=this.produitService.consulterCategorie(this.updatedCatId);
    this.produitService.updateProduit(this.currentProduit);
    this.router.navigate(["produits"]);
  }*/

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;

    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']); }
    );
  }

}
