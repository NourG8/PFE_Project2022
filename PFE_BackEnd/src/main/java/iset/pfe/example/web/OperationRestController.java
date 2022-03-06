package iset.pfe.example.web;

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
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.repositories.OperationRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class OperationRestController {
	
	@Autowired
	private OperationRepository operationRepository;
	
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
		

	@RequestMapping(value="/operations",method = RequestMethod.POST)
		public Operation AddOperation(@RequestBody Operation operation){
			return operationRepository.save(operation);
		}
		
	
	@RequestMapping(value="/operations/{idOperation}",method = RequestMethod.PUT)
	public ResponseEntity<Operation>  EditOperation(@PathVariable Integer idOperation, @RequestBody Operation operation){
		 return ResponseEntity.ok(operationRepository.save(operation));
	

	    }
}

