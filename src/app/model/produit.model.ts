import { Categorie } from "./categorie.model";

export class Produit {
    //? : veut dire que l'attribur peut etre defini ou undefined
    idProduit! : number;
    nomProduit! : string;
    prixProduit! : number;
    dateCreation! : Date ;
    categorie! : Categorie;
}
    