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
import iset.pfe.example.entities.Nourriture;
import iset.pfe.example.repositories.NourritureRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class NourritureRestController {
	@Autowired
	private NourritureRepository nourritureRepository;
	
	//getALL Nourritures method
	@RequestMapping(value="/nourritures",method = RequestMethod.GET)
	public List<Nourriture> getNourritures(){
		return nourritureRepository.findAll();
	}
		
	//get Nourriture ById method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.GET)
	public Nourriture getNourriture(@PathVariable Integer idNourriture) {
	Optional<Nourriture> nourriture = nourritureRepository.findById(idNourriture);
		if (nourriture.isPresent()) { 
			return nourriture.get();
		}else throw new RuntimeException("Nourriture introuvable !!");
	}
		
	//delete Nourriture method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteNourriture(@PathVariable Integer idNourriture) {
		Optional<Nourriture> nourriture = nourritureRepository.findById(idNourriture);
			if (nourriture.isPresent()) { 
				nourritureRepository.deleteById(idNourriture);
			}else throw new RuntimeException("Nourriture introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	//create new Nourriture method 
	@RequestMapping(value="/nourritures",method = RequestMethod.POST)
		public Nourriture AddNourriture(@RequestBody Nourriture nourriture ){
			return nourritureRepository.save(nourriture);
		}
		
	//update a Nourriture method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.PUT)
	public Nourriture EditNourriture(@PathVariable Integer idNourriture, @RequestBody Nourriture nourritures){
		Nourriture nourriture = nourritureRepository.findById(idNourriture).orElseThrow(()->new ResourceNotFoundException("Cet Nourriture n'existe pas"));
		nourriture.setIntitule(nourritures.getIntitule());
		nourriture.setQuantite(nourritures.getQuantite());
		nourriture.setQualite(nourritures.getQualite());		
		return nourriture;
	    }
		
}
