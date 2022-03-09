package iset.pfe.example.web;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.LaitRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.TankRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class OperationRestController {
	
	@Autowired
	private OperationRepository operationRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private LaitRepository laitRepository;
	
	@RequestMapping(value="/operations",method = RequestMethod.GET)
	public List<Operation> getOperations(){
		return operationRepository.findAll();
	}
		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.GET)
	public Operation getOperation(@PathVariable Integer idOperation) {
	Optional<Operation> op = operationRepository.findById(idOperation);
		if (op.isPresent()) { 
			return op.get();
		}else throw new RuntimeException("Operation introuvable !!");
	}
		
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOperation(@PathVariable Integer idOperation) {
		Optional<Operation> op= operationRepository.findById(idOperation);
			if (op.isPresent()) { 
				operationRepository.deleteById(idOperation);
			}else throw new RuntimeException("Operation introuvable ! vous ne pouvez pas le supprimer !!");
		}
		

	@RequestMapping(value="/remplissage",method = RequestMethod.POST)
		public Operation AddOperationRemplissage(@RequestBody Operation operation){
		Date date1=new Date();
		operation.setDateOperation(date1);
		operation.setTypeOp("Remplissage");
		Tank t1=tankRepository.getById(operation.getTank().getIdTank());
		Lait l1=laitRepository.getById(operation.getLait().getIdLait());
		l1.setQuantitePrise(operation.getPoidsLait());
		l1.setQuantiteRest(l1.getQuantiteRest()-operation.getPoidsLait());
		laitRepository.save(l1);
		System.out.println("*********"+t1.getIdTank());
		double s=t1.getPoidActuel()+operation.getPoidsLait();
		t1.setPoidActuel(s);
		tankRepository.save(t1);
		
		System.out.println("*********"+operation.getTank().getPoidActuel());
		
		if(operation.getPoidsLait()>l1.getQuantiteRest()) {
			System.out.println("la quantite introduise est superieur a la quantite actuel !!");
		}
		
		if(operation.getPoidsLait()>t1.getPoidActuel()) {
			System.out.println("la quantite introduise est superieur a la quantite actuel !!");
		}
		
		if(t1.getPoidActuel()==t1.getPoidVide()) {
			System.out.println("la quantite introduise est superieur a la quantite actuel !!");
			t1.setEtat("Remlis");
			//ma3adch yodhhor fel lisete des tank dans l operation !!
		}
		
		
			return operationRepository.save(operation);
		}
		
	
	
	
	@RequestMapping(value="/retrait",method = RequestMethod.POST)
	public Operation AddOperationRetrait(@RequestBody Operation operation){
	Date date1=new Date();
	operation.setDateOperation(date1);
	operation.setTypeOp("Retrait");
	
		operation.setLait(null);
		Tank t1=tankRepository.getById(operation.getTank().getIdTank());
		double s=t1.getPoidActuel()-operation.getPoidsLait();
		t1.setPoidActuel(s);
		tankRepository.save(t1);
		System.out.println("*********"+t1.getIdTank());
		System.out.println("*********"+operation.getTank().getPoidActuel());
	
		if(operation.getPoidsLait()>t1.getPoidActuel()) {
			System.out.println("la quantite introduise est superieur a la quantite actuel !!");
		}

	return operationRepository.save(operation);
}

	
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperation(@PathVariable Integer idOperation, @RequestBody Operation operation){
		 return ResponseEntity.ok(operationRepository.save(operation));
	    }
	
	
	
}

