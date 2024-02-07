import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html'
})
export class ListeCategoriesComponent implements OnInit{

  categories! : Categorie[];

  ajoutt:boolean=true;

  //objet a transmettre vers le compsant child "updatecategorie"
  updatedCat:Categorie = {"idCat":0,"nomCat":""};

  constructor(
    private produitService: ProduitService
  ){

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');

    this.chargerCategories();

  }

  categorieUpdated(cat:Categorie){
    console.log("Cat updated event, categorie reçu : ",cat);
    this.produitService.ajouterCategorie(cat).subscribe( ()=> this.chargerCategories());
    //this.produitService.ajouterCategorie(cat).subscribe( ()=> this.categories.push(cat));
  }

  chargerCategories(){
    this.produitService.listeCategories().subscribe(
      cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      }
    );
  }

  updateCat(cat:Categorie) {
    this.updatedCat=cat;
    this.ajoutt=false;
  }
    

}
