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
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.entities.Tank;
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
	
	
	@RequestMapping(value="/centre/{nomCentre}",method = RequestMethod.GET)
	public int getCollUtilise(@PathVariable String nomCentre){
		int msg=0;
		for(int i=0;i<collecteurRepository.findAll().size();i++) {
			Collecteur t=collecteurRepository.findAll().get(i);
			if(nomCentre.equals(t.getNomCollecteur())) {
				msg=1;
			}
			
		}
		return msg;
	}
	
	@RequestMapping(value="/coll/{tel}",method = RequestMethod.GET)
	public int getFTel(@PathVariable int tel){
		int msg=0;
		for(int i=0;i<collecteurRepository.findAll().size();i++) {
			Collecteur t=collecteurRepository.findAll().get(i);
			if(tel==t.getTel())
				msg=1;
		}
		return msg;
	}
	
	//si le matricule existe ou nn
	@RequestMapping(value="/collec/{matricule}",method = RequestMethod.GET)
	public int getCMatricule(@PathVariable String matricule){
		int msg=0;
		for(int i=0;i<collecteurRepository.findAll().size();i++) {
			Collecteur t=collecteurRepository.findAll().get(i);
			if(matricule.equals(t.getMatricule()))
				msg=1;
		}
		return msg;
	}
	
	
	//si le nom existe ou nn
	@RequestMapping(value="/coll1/{nomCollecteur}",method = RequestMethod.GET)
	public int getFNom(@PathVariable String nomCollecteur){
		int msg=0;
		for(int i=0;i<collecteurRepository.findAll().size();i++) {
			Collecteur t=collecteurRepository.findAll().get(i);
			if(nomCollecteur.equals(t.getNomCollecteur()))
				msg=1;
		}
		return msg;
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
	
	@RequestMapping(value="/collecteurs/{idCollecteur}",method = RequestMethod.PUT)
	public ResponseEntity<Collecteur> EditCollecteur(@PathVariable Integer idCollecteur, @RequestBody Collecteur collecteur){
		 return ResponseEntity.ok(collecteurRepository.save(collecteur));
    }
	
	
}
