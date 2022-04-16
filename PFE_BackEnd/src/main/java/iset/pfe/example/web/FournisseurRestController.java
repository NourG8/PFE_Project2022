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

import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.entities.Produit;
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
	
	@RequestMapping(value="/nbreF",method = RequestMethod.GET)
	public int getNbFournisseurs(){
		return fournisseurRepository.findAll().size();
	}
		
	
	//si le matricule existe ou nn
		@RequestMapping(value="/fournis/{matricule}",method = RequestMethod.GET)
		public int getFMatricule(@PathVariable String matricule){
			int msg=0;
			for(int i=0;i<fournisseurRepository.findAll().size();i++) {
				Fournisseur t=fournisseurRepository.findAll().get(i);
				if(matricule.equals(t.getMatricule()))
					msg=1;
			}
			return msg;
		}
		
		
		
		//si le nom existe ou nn
		@RequestMapping(value="/fournis1/{nom}",method = RequestMethod.GET)
		public int getFNom(@PathVariable String nom){
			int msg=0;
			for(int i=0;i<fournisseurRepository.findAll().size();i++) {
				Fournisseur t=fournisseurRepository.findAll().get(i);
				if(nom.equals(t.getNom()))
					msg=1;
			}
			return msg;
		}
		
	
	
	
	@RequestMapping(value="/fournisseurs/{idFournisseur}",method = RequestMethod.GET)
    public Fournisseur getFournisseur(@PathVariable Integer idFournisseur) {
		Optional<Fournisseur> f= fournisseurRepository.findById(idFournisseur);
		if (f.isPresent()) { 
			return f.get();
		}else throw new RuntimeException("Fournisseur introuvable !!");
	}
	
	
	@RequestMapping(value="/fournisseurs/{idFournisseur}",method = RequestMethod.DELETE)
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
	public ResponseEntity<Fournisseur> EditFournisseur(@PathVariable Integer idFournisseur, @RequestBody Fournisseur fournisseur){
		 return ResponseEntity.ok(fournisseurRepository.save(fournisseur));
    }
	
	
}
