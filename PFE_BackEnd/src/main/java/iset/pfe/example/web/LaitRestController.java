package iset.pfe.example.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Lait;
import iset.pfe.example.repositories.LaitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class LaitRestController {
	@Autowired
	private LaitRepository laitRepository;

	//getALL Lait method
	@RequestMapping(value="/laits",method = RequestMethod.GET)
	public List<Lait> getLaits(){
		return laitRepository.findAll();
	}
		
	//get Lait ById method
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.GET)
	public Lait getLait(@PathVariable Integer idLait) {
	Optional<Lait> lait = laitRepository.findById(idLait);
		if (lait.isPresent()) { 
			return lait.get();
		}else throw new RuntimeException("Lait introuvable !!");
	}
		
	//delete Lait method
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteLait(@PathVariable Integer idLait) {
		Optional<Lait> lait = laitRepository.findById(idLait);
			if (lait.isPresent()) { 
				laitRepository.deleteById(idLait);
			}else throw new RuntimeException("Lait introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	//create new Lait method 
	@RequestMapping(value="/laits",method = RequestMethod.POST)
		public Lait AddLait(@RequestBody Lait lait ){
			return laitRepository.save(lait);
		}
		
	//update a Lait method
	//????
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.PUT)
	public Lait EditLait(@PathVariable Integer idLait, @RequestBody Lait laits){
		Lait lait = laitRepository.findById(idLait).orElseThrow(()->new ResourceNotFoundException("Cet Lait n'existe pas"));
		lait.setPoid(laits.getPoid());
		lait.setDate_Extraction(laits.getDate_Extraction());	
		return lait;
	    }
}
