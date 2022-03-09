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

import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.LaitRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class LaitRestController {
	@Autowired
	private LaitRepository laitRepository;
	
	@RequestMapping(value="/laits",method = RequestMethod.GET)
	public List<Lait> getLaits(){
		return laitRepository.findAll();
	}
	
	@RequestMapping(value="/laitsFiltres",method = RequestMethod.GET)
	public List<Lait> getLaitsFiltres(){
		return laitRepository.findAllLaits();
	}
	
		
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.GET)
    public Lait getLait(@PathVariable Integer idLait) {
		Optional<Lait> l = laitRepository.findById(idLait);
		if (l.isPresent()) { 
			return l.get();
		}else throw new RuntimeException("Lait introuvable !!");
	}
	
	
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteLait(@PathVariable Integer idLait) {
		Optional<Lait> l = laitRepository.findById(idLait);
				if (l.isPresent()) { 
				laitRepository.deleteById(idLait);
		    }else throw new RuntimeException("Lait introuvable ! vous ne pouvez pas le supprimer !!");
	}
	
	@RequestMapping(value="/laits",method = RequestMethod.POST)
		public Lait AddLait(@RequestBody Lait lait){
		return laitRepository.save(lait);
	}
	
	@RequestMapping(value="/laits/{idLait}",method = RequestMethod.PUT)
	
	public ResponseEntity<Lait> EditLait(@PathVariable Integer idLait, @RequestBody Lait lait){
		return ResponseEntity.ok(laitRepository.save(lait));    }
	

}

