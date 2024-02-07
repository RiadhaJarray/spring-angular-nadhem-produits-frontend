import { Categorie } from './categorie.model';

//cet class pour utiliser "@RepositoryRestResource" 
export class CategorieWrapper{
_embedded!: { categories: Categorie[]};
}