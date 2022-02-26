package iset.pfe.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.repositories.AgriculteurRepository;

@SpringBootApplication
public class PfeBackEndApplication implements CommandLineRunner{

	@Autowired
	private AgriculteurRepository agriculteurRepository;
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Agriculteur a1=new Agriculteur("Ahmed", "Ben saber", "ahmed@gmail.com", "Bizerte", 11221122, 98565455, "Ahmed", "ahmed");
		agriculteurRepository.save(a1);
	}

}
