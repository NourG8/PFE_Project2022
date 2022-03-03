package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.LaitRepository;
import iset.pfe.example.repositories.NourritureRepository;
import iset.pfe.example.repositories.TankRepository;
import iset.pfe.example.repositories.VacheRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner{

	@Autowired
	private AgriculteurRepository agriculteurRepository;
	@Autowired
	private VacheRepository vacheRepository;
	@Autowired
	private TankRepository tankRepository;
	@Autowired
	private NourritureRepository nourritureRepository;
	@Autowired
	private LaitRepository laitRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Agriculteur a1=new Agriculteur("Ahmed", "Ben saber", "ahmed@gmail.com", "Bizerte", 11221122, 98565455, "Ahmed", "ahmed");
		agriculteurRepository.save(a1);
		Date date1=new Date(12/12/2016);
		Date dateE=new Date(02/02/2021);
		Date dateS=new Date(18/02/2021);
		
		
		Vache v1=new Vache(180.00, "race 1", date1, "malade", 23.5,a1);
		vacheRepository.save(v1);
		Lait l1=new Lait(25, date1, v1);
		laitRepository.save(l1);
		Tank t1=new Tank(125, 125, dateE, dateS, true,a1);
		t1.getLaits().add(l1);
		tankRepository.save(t1);
		Produit n1=new Produit("nourriture 1 ..", 100, "bonne", a1);
		nourritureRepository.save(n1);
		l1.getTanks().add(t1);
		laitRepository.save(l1);
	}

}
