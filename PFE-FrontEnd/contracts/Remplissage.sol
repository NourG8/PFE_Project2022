// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Remplissage{

    struct Tank{
      uint idTank;
 string matricule;
 uint poidVide;
  uint poidActuel;
 string etat ;

   }

struct Operation{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
 // uint tank ;
  Collecteur collecteur;
//  Agriculteur agriculteur;
   }

struct Agriculteur{
  string  prenomAgriculteur ;
   string nomAgriculteur ;
   }

struct Collecteur{
  uint idCollecteur;
  string  nomCollecteur ;
  string adresse ;
  uint  tel;
   }


   constructor() {
  }
Operation[] public operations2;

string[] public ALLS;
uint256 public nextID = 1;
//create 2
  function addOperation2(Operation memory op)
   public returns (Operation memory op0) {
   //  Agriculteur memory newAgriculteur = Agriculteur(nomAgriculteur,prenomAgriculteur);

     Collecteur memory newCollecteur = Collecteur(op.collecteur.idCollecteur, 
     op.collecteur.nomCollecteur
     ,op.collecteur.adresse,op.collecteur.tel);

    Operation memory newOperation = Operation(op.idOperation,op.poidsLait, 
    op.dateOperation,op.typeOp,op.code,newCollecteur);
    operations2.push(newOperation);
    return (newOperation);
  }
  //get all operations 
  
  function getOperations() public view returns (Operation[] memory result ) {
    return operations2;
  }

//get one operation

 function getOperation(uint id) public view returns(Operation memory operation) {
    for(uint i = 0; i<nextID;i++) {
      if(operations2[i].idOperation==id) {
        return operations2[i];
      }
    }
  }

}