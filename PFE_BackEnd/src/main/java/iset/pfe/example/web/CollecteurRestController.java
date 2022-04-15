package iset.pfe.example.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import iset.pfe.example.entities.Collecteur;
import iset.pfe.example.repositories.CollecteurRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class CollecteurRestController {
	@Autowired
	CollecteurRepository collecteurRepository;
 
	
	
	
	@RequestMapping(value="/collecteurs",method = RequestMethod.GET)
	public List<Collecteur> getCollecteurs(){
		return collecteurRepository.findAll();
	}
	
	@RequestMapping(value="/nbreCollecteur",method = RequestMethod.GET)
	public int getNbCollecteurs(){
		return collecteurRepository.findAll().size();
	}
		
	@RequestMapping(value="/collecteurs/{idCollecteur}",method = RequestMethod.GET)
    public Collecteur getCollecteur(@PathVariable Integer idCollecteur) {
		Optional<Collecteur> f= collecteurRepository.findById(idCollecteur);
		if (f.isPresent()) { 
			return f.get();
		}else throw new RuntimeException("Collecteur introuvable !!");
	}
	
	
	@RequestMapping(value="/collecteurs/{idCollecteur}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteCollecteur(@PathVariable Integer idCollecteur) {
		Optional<Collecteur> f = collecteurRepository.findById(idCollecteur);
				if (f.isPresent()) { 
					collecteurRepository.deleteById(idCollecteur);
		    }else throw new RuntimeException("Collecteur introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/collecteurs",method = RequestMethod.POST)
		public Collecteur AddCollecteur(@RequestBody Collecteur collecteur){
		return collecteurRepository.save(collecteur);
	}
	
	@RequestMapping(value="/Collecteurs/{idCollecteur}",method = RequestMethod.PUT)
	public ResponseEntity<Collecteur> EditCollecteur(@PathVariable Integer idCollecteur, @RequestBody Collecteur collecteur){
		 return ResponseEntity.ok(collecteurRepository.save(collecteur));
    }
	
	
}
