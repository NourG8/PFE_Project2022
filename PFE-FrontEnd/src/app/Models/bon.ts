import { Observable } from "rxjs";
import { Fournisseur } from "./fournisseur";
import { Produit } from "./produit";
import { Agriculteur } from "./agriculteur";

export class Bon{

  idBon!: number;
  quantite!: number;
  prix!: number;
  type!: string;
  date!: Date;
  agriculteur!:Agriculteur;
  fournisseur!:Fournisseur;
  produit!:Produit;

}