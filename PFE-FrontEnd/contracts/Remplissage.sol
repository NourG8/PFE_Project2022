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
   uint tank ;
   }

   constructor() {
  }

Operation[] public operations2;
Operation[] public operations;
uint256 public nextID = 1;


//create 2
  function addOperation2(Operation memory op)
   public returns (Operation memory op0) {
    operations2.push(op);
    return (op);
  }
//create
  function addOperation(uint poidsLait,string memory dateOperation, string memory typeOp,uint code,uint  tank)
   public returns (uint idOperation0,uint poidsLait0, string memory dateOperation0, string memory typeOp0, uint code0, uint  tank0) {
     nextID++;
    Operation memory newOperation = Operation(nextID, poidsLait, dateOperation,typeOp,code,tank);
    operations.push(newOperation);
    return (newOperation.idOperation, newOperation.poidsLait, newOperation.dateOperation,newOperation.typeOp,newOperation.code,newOperation.tank);
  }
  //get all operations 
  
  function getOperations() public view returns (Operation[] memory result ) {
    return operations;
  }

//get one operation

 function getOperation(uint id) public view returns(Operation memory operation) {
    for(uint i = 0; i<nextID;i++) {
      if(operations[i].idOperation==id) {
        return operations[i];
      }
    }
  }

}