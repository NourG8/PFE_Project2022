import { Tank } from "./tank";
import { Lait } from "./lait";

export class Operation{

    idOperation!: number;
    poidsLait!: number;
    dateOperation!: string;
    typeOp!: string;
    tank!:Tank;
    lait!:Lait;
    
  }