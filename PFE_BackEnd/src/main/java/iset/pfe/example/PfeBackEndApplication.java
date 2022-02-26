package iset.pfe.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.VacheRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner{

	@Autowired
	private AgriculteurRepository agriculteurRepository;
	@Autowired
	private VacheRepository vacheRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Agriculteur a1=new Agriculteur("Ahmed", "Ben saber", "ahmed@gmail.com", "Bizerte", 11221122, 98565455, "Ahmed", "ahmed");
		agriculteurRepository.save(a1);
		Date date1=new Date(12/12/2016);
		Vache v1=new Vache(180.00, "race 1", date1, "malade", 23.5);
		vacheRepository.save(v1);
	}

}
