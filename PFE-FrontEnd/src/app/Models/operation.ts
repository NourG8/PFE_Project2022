import { Tank } from "./tank";
import { Lait } from "./lait";
import { Collecteur } from "./collecteur";
import { Agriculteur } from "./agriculteur";

export class Operation{

    idOperation!: number;
    poidsLait!: number;
    dateOperation!: string;
    typeOp!: string;
    code!:number;
    tank!:Tank;
    collecteur!:Collecteur;
    agriculteur!:Agriculteur;
    lait!:Lait;
    
  }