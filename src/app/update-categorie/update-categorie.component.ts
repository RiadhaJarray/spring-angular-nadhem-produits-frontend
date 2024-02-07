import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html'
})
export class UpdateCategorieComponent implements OnInit{

  //lorsque j'appelle ce composant : je doit lui passer un attribut categorie de type categorie 
  // comme parametre d'une methode
  //pour recevoire
  @Input() 
  categorie! : Categorie;

  //exemple pour tester le passage des donne entre "listecategorie" et "update categorie"
  /*@Input() 
  data! : string;*/

  @Input()
  ajout!:boolean;

  //categorieUpdated : va recevoire une instance de l'objet event emmiter qui va transmettre  ou va donne (emmetre) une categorie
  //avec cette decorateur je peux transmettre le categorie pour ajouter ou update du composant "updatecategorie" vers "listeCaategorie"
  //pour emettre 
  @Output() 
  categorieUpdated = new EventEmitter<Categorie>();


  constructor(){

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //console.log(this.data );

    console.log("ngOnInit du composant UpdateCategorie ",this.categorie);

  }

  saveCategorie(){
    //emettre un evenement : retourne un objet de type categorie
    this.categorieUpdated.emit(this.categorie);
  }
}
