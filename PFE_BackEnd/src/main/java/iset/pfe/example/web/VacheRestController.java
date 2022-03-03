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

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.VacheRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class VacheRestController {

	@Autowired
	private VacheRepository vacheRepository;
	
	@RequestMapping(value="/vaches",method = RequestMethod.GET)
	public List<Vache> getVaches(){
		return vacheRepository.findAll();
	}
	
		
	@RequestMapping(value="/vaches/{idVache}",method = RequestMethod.GET)
    public Vache getVache(@PathVariable Integer idVache) {
		Optional<Vache> v = vacheRepository.findById(idVache);
		if (v.isPresent()) { 
			return v.get();
		}else throw new RuntimeException("vache introuvable !!");
	}
	
	
	@RequestMapping(value="/vaches/{idVache}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVache(@PathVariable Integer idVache) {
		Optional<Vache> v = vacheRepository.findById(idVache);
				if (v.isPresent()) { 
				vacheRepository.deleteById(idVache);
		    }else throw new RuntimeException("Vache introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/vaches",method = RequestMethod.POST)
		public Vache AddVache(@RequestBody Vache vache){
		return vacheRepository.save(vache);
	}
	
	@RequestMapping(value="/vaches/{idVache}",method = RequestMethod.PUT)
	
	public Vache EditVache(@PathVariable Integer idVache, @RequestBody Vache vache){
      Vache v = vacheRepository.findById(idVache).orElseThrow(()->new ResourceNotFoundException("Cet vache n'existe pas"));
    	v.setDateNaissance(vache.getDateNaissance()); 
    	v.setEtat(vache.getEtat());
    	v.setPoids(vache.getPoids());
    	v.setQte_prodLait(vache.getQte_prodLait());
    	v.setRace(vache.getRace());
    	vacheRepository.save(v);
	  	return v;
    }
	
}
