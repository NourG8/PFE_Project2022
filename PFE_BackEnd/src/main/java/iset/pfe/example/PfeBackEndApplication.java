package iset.pfe.example;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.BonRepository;
import iset.pfe.example.repositories.FournisseurRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.ProduitRepository;
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
	private ProduitRepository produitRepository;
	@Autowired
	private OperationRepository operationRepository;
	@Autowired
	private BonRepository bonRepository;
	@Autowired
	private FournisseurRepository fournisseurRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Date date1=new Date(12/12/2016);
		Date dateE=new Date(02/02/2021);
		Date dateS=new Date(18/02/2021);
		
		Agriculteur a1=new Agriculteur("nour", "Guerfali", "nourguerfali08@gmail.com", "Bizerte", 11431134, "nour", "1234");
		agriculteurRepository.save(a1);
		
		Vache v1=new Vache(180.00, "race 1", date1, "malade", 23.5);
		vacheRepository.save(v1);
		
		Tank t1=new Tank(100.0, 20.0, "remplis",a1);
		tankRepository.save(t1);
		
		Operation op1=new Operation(10, date1, "Remplissage", t1, v1);
		operationRepository.save(op1);
		
		Produit p1=new Produit("Prod 1", "12se54z5");
		produitRepository.save(p1);
		
		Fournisseur f1=new Fournisseur("mohamed", "12ad2546at8");
		fournisseurRepository.save(f1);
		
		Bon b1=new Bon(150.0, 180.0, "Entree", date1,a1,p1,f1);
		bonRepository.save(b1);
		
		
	}

}
