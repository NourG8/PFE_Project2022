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
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.repositories.FournisseurRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class FournisseurRestController {

	@Autowired
	private FournisseurRepository fournisseurRepository;
	
	@RequestMapping(value="/fournisseurs",method = RequestMethod.GET)
	public List<Fournisseur> getFournisseurs(){
		return fournisseurRepository.findAll();
	}
	
		
	@RequestMapping(value="/fournisseurs/{ididFournisseur}",method = RequestMethod.GET)
    public Fournisseur getFournisseur(@PathVariable Integer idFournisseur) {
		Optional<Fournisseur> f= fournisseurRepository.findById(idFournisseur);
		if (f.isPresent()) { 
			return f.get();
		}else throw new RuntimeException("Fournisseur introuvable !!");
	}
	
	
	@RequestMapping(value="/bons/{idFournisseur}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteFournisseur(@PathVariable Integer idFournisseur) {
		Optional<Fournisseur> f = fournisseurRepository.findById(idFournisseur);
				if (f.isPresent()) { 
					fournisseurRepository.deleteById(idFournisseur);
		    }else throw new RuntimeException("Fournisseur introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/fournisseurs",method = RequestMethod.POST)
		public Fournisseur AddFournisseur(@RequestBody Fournisseur fournisseur){
		return fournisseurRepository.save(fournisseur);
	}
	
	@RequestMapping(value="/fournisseurs/{idFournisseur}",method = RequestMethod.PUT)
	
	public Fournisseur EditFournisseur(@PathVariable Integer idFournisseur, @RequestBody Fournisseur fournisseur){
		Fournisseur f = fournisseurRepository.findById(idFournisseur).orElseThrow(()->new ResourceNotFoundException("Cet fournisseur n'existe pas"));
    	f.setNom(fournisseur.getNom());
    	f.setMatricule(fournisseur.getMatricule());

	  	return f;
    }
	
}
