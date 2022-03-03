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
import iset.pfe.example.entities.Bon;
import iset.pfe.example.repositories.BonRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BonRestController {

	@Autowired
	private BonRepository bonRepository;

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
				if (b.isPresent()) { 
					bonRepository.deleteById(idBon);
		    }else throw new RuntimeException("Bon introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/bons",method = RequestMethod.POST)
		public Bon AddBon(@RequestBody Bon bon){
		return bonRepository.save(bon);
	}
	
	@RequestMapping(value="/bons/{idBon}",method = RequestMethod.PUT)
	
	public Bon EditBon(@PathVariable Integer idBon, @RequestBody Bon bon){
      Bon b = bonRepository.findById(idBon).orElseThrow(()->new ResourceNotFoundException("Cet Bon n'existe pas"));
    	b.setDate(bon.getDate());
    	b.setQuantite(bon.getQuantite());
			
	  	return b;
    }
	

}
