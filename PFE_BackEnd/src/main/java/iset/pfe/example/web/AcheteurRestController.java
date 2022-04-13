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

import iset.pfe.example.entities.Acheteur;
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.repositories.AcheteurRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AcheteurRestController {
	@Autowired
	AcheteurRepository acheteurRepository;
 
	
	
	
	@RequestMapping(value="/Acheteurs",method = RequestMethod.GET)
	public List<Acheteur> getAcheteurs(){
		return acheteurRepository.findAll();
	}
	
	@RequestMapping(value="/nbreAcheteur",method = RequestMethod.GET)
	public int getNbAcheteurs(){
		return acheteurRepository.findAll().size();
	}
		
	@RequestMapping(value="/Acheteurs/{idAcheteur}",method = RequestMethod.GET)
    public Acheteur getAcheteur(@PathVariable Integer idAcheteur) {
		Optional<Acheteur> f= acheteurRepository.findById(idAcheteur);
		if (f.isPresent()) { 
			return f.get();
		}else throw new RuntimeException("Acheteur introuvable !!");
	}
	
	
	@RequestMapping(value="/Acheteurs/{idAcheteur}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteAcheteur(@PathVariable Integer idAcheteur) {
		Optional<Acheteur> f = acheteurRepository.findById(idAcheteur);
				if (f.isPresent()) { 
					acheteurRepository.deleteById(idAcheteur);
		    }else throw new RuntimeException("Acheteur introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/Acheteurs",method = RequestMethod.POST)
		public Acheteur AddAcheteur(@RequestBody Acheteur acheteur){
		return acheteurRepository.save(acheteur);
	}
	
	@RequestMapping(value="/Acheteurs/{idAcheteur}",method = RequestMethod.PUT)
	public ResponseEntity<Acheteur> EditAcheteur(@PathVariable Integer idAcheteur, @RequestBody Acheteur acheteur){
		 return ResponseEntity.ok(acheteurRepository.save(acheteur));
    }
	
	
}
