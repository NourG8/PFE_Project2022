package iset.pfe.example.web;

import java.util.Date;
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
import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.BonRepository;
import iset.pfe.example.repositories.ProduitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BonRestController {

	@Autowired
	private BonRepository bonRepository;

	@Autowired
	private ProduitRepository produitRepository;
	
	@Autowired
	private AgriculteurRepository agriculteurRepository;
	
	@RequestMapping(value="/bons",method = RequestMethod.GET)
	public List<Bon> getBons(){
		return bonRepository.findAll();
	}
	
		
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.GET)
    public Bon getBon(@PathVariable Integer idBon) {
		Optional<Bon> b= bonRepository.findById(idBon);
		if (b.isPresent()) { 
			return b.get();
		}else throw new RuntimeException("Bon introuvable !!");
	}
	
	
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteBon(@PathVariable Integer idBon) {
		Optional<Bon> b = bonRepository.findById(idBon);
		b.get().setAgriculteur(null);
		b.get().setProduit(null);
		b.get().setFournisseur(null);
		System.out.println(b.get().getIdBon());
				if (b.isPresent()) { 
//					bonRepository.save(b.get());
//					bonRepository.deleteById(b.get().getIdBon());
					bonRepository.deleteBon(idBon);
		    }else throw new RuntimeException("Bon introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/bons",method = RequestMethod.POST)
		public Bon AddBon(@RequestBody Bon bon){
		String t1="Entree";
		String t2="Sortie";
		Produit p=produitRepository.findById(bon.getProduit().getIdProduit()).get();
		Date date=new Date();
		bon.setDate(date);
		Agriculteur a=agriculteurRepository.findAll().get(0);
		bon.setAgriculteur(a);
		bonRepository.save(bon);
		
		if(bon.getType().equals(t1)) {
			
			p.setQte(p.getQte()+bon.getQuantite());
			produitRepository.save(p);
		}
		else if(bon.getType().equals(t2) && bon.getQuantite()>p.getQte()) {
			System.out.println("errreeeuuuur  !!!!!!");
		}
		else if(bon.getType().equals(t2) && bon.getQuantite()<=p.getQte()) {
			
			p.setQte(p.getQte()-bon.getQuantite());
			produitRepository.save(p);
		}
		
		
		bon.setProduit(p);
	
		return bonRepository.save(bon);
	}
	
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.PUT)
	
	public Bon EditBon(@PathVariable Integer idBon, @RequestBody Bon bon){
        Bon b = bonRepository.findById(idBon).orElseThrow(()->new ResourceNotFoundException("Cet Bon n'existe pas"));
        b.setIdBon(idBon);
    	b.setDate(bon.getDate());
    	b.setPrix(bon.getPrix());
    	b.setType(bon.getType());
    	b.setAgriculteur(bon.getAgriculteur());
    	b.setFournisseur(bon.getFournisseur());
    	b.setProduit(bon.getProduit());
    	b.setQuantite(bon.getQuantite());
    	bonRepository.save(b);
	  	return b;
    }
	
	
	@RequestMapping(value="/bonsEntree",method = RequestMethod.GET)
	public String getListBons(){
		double s=0;
		for(int i=0;i<bonRepository.findAllBon("Entree").size();i++)
		System.out.println("&&&&&&&& : "+bonRepository.findAllBon("Entree").get(i));
		return bonRepository.findAllBon("Entree").get(0).split(",")[0];
	}
	
	
//	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.PUT)
//	public void EditBon(@PathVariable Integer idBon, @RequestBody Bon bon){
//		bonRepository.updateBon(bon.getIdBon(), bon.getQuantite(), bon.getPrix(), bon.getType(), bon.getDate(), bon.getAgriculteur());
//    }
//	


}
