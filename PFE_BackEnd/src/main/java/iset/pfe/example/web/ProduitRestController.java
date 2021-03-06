package iset.pfe.example.web;

import java.util.ArrayList;
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
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.repositories.ProduitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ProduitRestController {
	@Autowired
	private ProduitRepository produitRepository;
	
	//getALL Nourritures method
	@RequestMapping(value="/produits",method = RequestMethod.GET)
	public List<Produit> getNourritures(){
		return produitRepository.findAll();
	}
	
	
	//si l'intitule du produit existe ou nn
	@RequestMapping(value="/prod/{intitule}",method = RequestMethod.GET)
	public int getProdIntitule(@PathVariable String intitule){
		int msg=0;
		for(int i=0;i<produitRepository.findAll().size();i++) {
			Produit t=produitRepository.findAll().get(i);
			if(intitule.equals(t.getIntitule()))
				msg=1;
		}
		return msg;
	}
	
	
	
	//si l'intitule du produit existe ou nn
	@RequestMapping(value="/prod1/{libelle}",method = RequestMethod.GET)
	public int getProdLibelle(@PathVariable String libelle){
		int msg=0;
		for(int i=0;i<produitRepository.findAll().size();i++) {
			Produit t=produitRepository.findAll().get(i);
			if(libelle.equals(t.getLibelle()))
				msg=1;
		}
		return msg;
	}
	
	
	
	@RequestMapping(value="/getProduitsDispo",method = RequestMethod.GET)
	public List<Produit> getProdDispo(){
		List<Produit> l=new ArrayList<Produit>();
		for(int i=0;i< produitRepository.findAll().size();i++) {
			Produit p=produitRepository.findAll().get(i);
			if(p.getQte()>0) {
				l.add(p);
			}
		}
		return l;
	}
	
	@RequestMapping(value="/nbreP",method = RequestMethod.GET)
	public int getNbNourritures(){
		return produitRepository.findAll().size();
	}
		
	
	@RequestMapping(value="/getSomStock",method = RequestMethod.GET)
	public int getSomStock(){
		int som=0;
		for(int i=0;i< produitRepository.findAll().size();i++) {
			Produit p=produitRepository.findAll().get(i);
			som=(int) (som+p.getQte());
		}
		return som;
	}
		
	
	
	//get Nourriture ById method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.GET)
	public Produit getNourriture(@PathVariable Integer idProduit) {
	Optional<Produit> produit = produitRepository.findById(idProduit);
		if (produit.isPresent()) { 
			return produit.get();
		}else throw new RuntimeException("Produit introuvable !!");
	}
		
	//delete Nourriture method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteNourriture(@PathVariable Integer idProduit) {
		Optional<Produit> produit = produitRepository.findById(idProduit);
			if (produit.isPresent()) { 
				produitRepository.deleteById(idProduit);
			}else throw new RuntimeException("Produit introuvable ! vous ne pouvez pas le supprimer !!");
		}
		
	//create new Nourriture method 
	@RequestMapping(value="/produits",method = RequestMethod.POST)
		public Produit AddNourriture(@RequestBody Produit produit ){
		produit.setQte(0);
			return produitRepository.save(produit);
		}
		
	//update a Nourriture method
	@RequestMapping(value="/produits/{idProduit}",method = RequestMethod.PUT)
	public ResponseEntity<Produit> EditNourriture(@PathVariable Integer idProduit, @RequestBody Produit produits){
		 return ResponseEntity.ok(produitRepository.save(produits));

	    }
		
}
