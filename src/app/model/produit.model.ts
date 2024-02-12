import { Categorie } from "./categorie.model";
import { Image } from "./image.model";

export class Produit {
    //? : veut dire que l'attribur peut etre defini ou undefined
    idProduit! : number;
    nomProduit! : string;
    prixProduit! : number;
    dateCreation! : Date ;
    categorie! : Categorie;
    image! : Image;
    imageStr!:string;
    images!: Image[];

}
    