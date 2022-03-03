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
import iset.pfe.example.entities.Produit;
import iset.pfe.example.repositories.NourritureRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class NourritureRestController {
	@Autowired
	private NourritureRepository nourritureRepository;
	
	//getALL Nourritures method
	@RequestMapping(value="/nourritures",method = RequestMethod.GET)
	public List<Produit> getNourritures(){
		return nourritureRepository.findAll();
	}
		
	//get Nourriture ById method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.GET)
	public Produit getNourriture(@PathVariable Integer idNourriture) {
	Optional<Produit> produit = nourritureRepository.findById(idNourriture);
		if (produit.isPresent()) { 
			return produit.get();
		}else throw new RuntimeException("Nourriture introuvable !!");
	}
		
	//delete Nourriture method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteNourriture(@PathVariable Integer idNourriture) {
		Optional<Produit> produit = nourritureRepository.findById(idNourriture);
			if (produit.isPresent()) { 
				nourritureRepository.deleteById(idNourriture);
			}else throw new RuntimeException("Nourriture introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	//create new Nourriture method 
	@RequestMapping(value="/nourritures",method = RequestMethod.POST)
		public Produit AddNourriture(@RequestBody Produit produit ){
			return nourritureRepository.save(produit);
		}
		
	//update a Nourriture method
	@RequestMapping(value="/nourritures/{idNourriture}",method = RequestMethod.PUT)
	public Produit EditNourriture(@PathVariable Integer idNourriture, @RequestBody Produit produits){
		Produit produit = nourritureRepository.findById(idNourriture).orElseThrow(()->new ResourceNotFoundException("Cet Nourriture n'existe pas"));
		produit.setIntitule(produits.getIntitule());
		produit.setQuantite(produits.getQuantite());
		produit.setQualite(produits.getQualite());		
		return produit;
	    }
		
}
