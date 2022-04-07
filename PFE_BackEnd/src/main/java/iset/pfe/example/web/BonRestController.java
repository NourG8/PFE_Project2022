package iset.pfe.example.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
	@PreAuthorize("hasAuthority('USER')")
	public List<Bon> getBons(){
		return bonRepository.findAllBonSortie("Entree");
	}
	
	@RequestMapping(value="/bonsSortie",method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('USER')")
	public List<Bon> getBonsSortie(){
		return bonRepository.findAllBonSortie("Sortie");
	}
	
	@RequestMapping(value="/nbreB",method = RequestMethod.GET)
	public int getNbBons(){
		return bonRepository.findAll().size();
	}
	
		
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('USER')")
    public Bon getBon(@PathVariable Integer idBon) {
		Optional<Bon> b= bonRepository.findById(idBon);
		if (b.isPresent()) { 
			return b.get();
		}else throw new RuntimeException("Bon introuvable !!");
	}
	
	
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.DELETE)
	@ResponseBody
	@PreAuthorize("hasAuthority('USER')")
	public void deleteBon(@PathVariable Integer idBon) {
		Optional<Bon> b = bonRepository.findById(idBon);
		Produit p=produitRepository.findById(b.get().getProduit().getIdProduit()).get();
		double qte =b.get().getQuantite();
		b.get().setAgriculteur(null);
		b.get().setProduit(null);
		b.get().setFournisseur(null);
		System.out.println(b.get().getIdBon());
				if (b.isPresent() && b.get().getType().equals("Entree") ) { 
					
					p.setQte(p.getQte()-qte);
//					bonRepository.save(b.get());
//					bonRepository.deleteById(b.get().getIdBon());
					produitRepository.save(p);
					bonRepository.deleteBon(idBon);
		    }else if (b.isPresent() && b.get().getType().equals("Sortie") ) { 
				
				p.setQte(p.getQte()+qte);
//				bonRepository.save(b.get());
//				bonRepository.deleteById(b.get().getIdBon());
				produitRepository.save(p);
				bonRepository.deleteBon(idBon);
	    }
				else throw new RuntimeException("Bon introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/bons",method = RequestMethod.POST)

		public Bon AddBon(@RequestBody Bon bon){
		String t1="Entree";
		String t2="Sortie";
		Produit p=produitRepository.findById(bon.getProduit().getIdProduit()).get();
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);
	     
		bon.setDate(currentDateTime);
		Agriculteur a=agriculteurRepository.findAll().get(0);
		bon.setAgriculteur(a);
		bon.setType("Entree");
		
					
			p.setQte(p.getQte()+bon.getQuantite());
			produitRepository.save(p);
		
		bon.setProduit(p);
	
		return bonRepository.save(bon);
	}
	
	
	@RequestMapping(value="/bonsSortie",method = RequestMethod.POST)
	public Bon AddBonSortie(@RequestBody Bon bon){
	
	String t2="Sortie";
	 Produit p=produitRepository.findById(bon.getProduit().getIdProduit()).get();
	 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
     String currentDateTime = dateFormatter.format(new Date());
     System.out.println(currentDateTime);
     
	bon.setDate(currentDateTime);
	Agriculteur a=agriculteurRepository.findAll().get(0);
	bon.setAgriculteur(a);
	
		bon.setFournisseur(null);
		bon.setPrix(-1);
		bonRepository.save(bon);
		
		p.setQte(p.getQte()-bon.getQuantite());
		produitRepository.save(p);
		bon.setType("Sortie");
	
		bon.setProduit(p);

	return bonRepository.save(bon);
}
	
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.PUT)
	public Bon EditBon(@PathVariable Integer idBon, @RequestBody Bon bon){
        Bon b = bonRepository.findById(idBon).orElseThrow(()->new ResourceNotFoundException("Cet Bon n'existe pas"));
        Bon b1=bonRepository.findById(idBon).get();
        double qte=b1.getQuantite();
        System.out.println("a5a52ss2002d652 "+b1.getQuantite());
        Produit p=produitRepository.findById(b.getProduit().getIdProduit()).get();
        produitRepository.save(p);
        b.setIdBon(idBon);
//    	b.setDate(bon.getDate());
    	b.setPrix(bon.getPrix());
//    	b.setType(bon.getType());
//    	b.setAgriculteur(agriculteurRepository.findAll().get(0));
    	b.setFournisseur(bon.getFournisseur());
//    	b.setProduit(bon.getProduit());
    	b.setQuantite(bon.getQuantite());
    	bonRepository.save(b);
    	
    	System.out.println("aaaaaa "+(p.getQte()-qte+bon.getQuantite()));
    	p.setQte(p.getQte()-qte+bon.getQuantite());
    	System.out.println(p.getQte());
    	System.out.println(b.getQuantite());
    	System.out.println(bon.getQuantite());
    	produitRepository.save(p);
    	System.out.println("************************************************");
    	System.out.println(p.getQte());
    	System.out.println(b.getQuantite());
    	System.out.println(bon.getQuantite());
    	bonRepository.save(b);
	  	return b;
    }
	
	

	@RequestMapping(value="/bonsSortie/{idBon}",method = RequestMethod.PUT)
	public Bon EditBonSortie(@PathVariable Integer idBon, @RequestBody Bon bon){
        Bon b = bonRepository.findById(idBon).orElseThrow(()->new ResourceNotFoundException("Cet Bon n'existe pas"));
        Bon b1=bonRepository.findById(idBon).get();
        double qte=b1.getQuantite();
        Produit p=produitRepository.findById(b.getProduit().getIdProduit()).get();
        produitRepository.save(p);
        b.setIdBon(idBon);
    	b.setPrix(bon.getPrix());
    	b.setFournisseur(bon.getFournisseur());
    	b.setQuantite(bon.getQuantite());
    	bonRepository.save(b);
    	
//    	System.out.println("aaaaaa "+(p.getQte()-qte+bon.getQuantite()));
    	p.setQte(p.getQte()+qte-bon.getQuantite());
    	System.out.println(p.getQte());
    	System.out.println(b.getQuantite());
    	System.out.println(bon.getQuantite());
    	produitRepository.save(p);
    	System.out.println("************************************************");
    	bonRepository.save(b);
	  	return b;
    }
	
	
	
	@RequestMapping(value="/bonsEntree",method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('USER')")
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
