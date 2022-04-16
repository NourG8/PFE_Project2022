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
import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.repositories.AgriculteurRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AgriculteurRestController {
	@Autowired
	private AgriculteurRepository agriculteurRepository;
	
	@RequestMapping(value="/agriculteurs",method = RequestMethod.GET)
	public List<Agriculteur> getAgriculteurs(){
		return agriculteurRepository.findAll();
	}
	
	@RequestMapping(value="/getUser/{username}",method = RequestMethod.GET)
    public Agriculteur getuser(@PathVariable String username) {
		Agriculteur u=agriculteurRepository.findUserWithName(username).get();
		return u;
	}
		
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.GET)
    public Agriculteur getAgriculteur(@PathVariable Integer idAgriculteur) {
		Optional<Agriculteur> ag = agriculteurRepository.findById(idAgriculteur);
		if (ag.isPresent()) { 
			return ag.get();
		}else throw new RuntimeException("Agriculteur introuvable !!");
	}
	
	
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteAgriculteur(@PathVariable Integer idAgriculteur) {
		Optional<Agriculteur> ag = agriculteurRepository.findById(idAgriculteur);
				if (ag.isPresent()) { 
				agriculteurRepository.deleteById(idAgriculteur);
		    }else throw new RuntimeException("Agriculteur introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/agriculteurs",method = RequestMethod.POST)
		public Agriculteur AddAgriculteur(@RequestBody Agriculteur agriculteur ){
		return agriculteurRepository.save(agriculteur);
	}
	
	@RequestMapping(value="/agriculteurs/{idAgriculteur}",method = RequestMethod.PUT)
	
	public Agriculteur EditAgriculteur(@PathVariable Integer idAgriculteur, @RequestBody Agriculteur agriculteur){
      Agriculteur ag = agriculteurRepository.findById(idAgriculteur).orElseThrow(()->new ResourceNotFoundException("Cet agriculteur n'existe pas"));
    	
    	ag.setAdress(agriculteur.getAdress());
    	ag.setCin(ag.getCin());
    	ag.setEmail(agriculteur.getEmail());
    	ag.setNom(ag.getNom());
    	ag.setPrenom(agriculteur.getPrenom());
    	ag.setUsername(agriculteur.getUsername());
    	ag.setPassword(agriculteur.getPassword());
		agriculteurRepository.save(ag);
			
	  	return ag;
    }
	

}
