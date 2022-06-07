package iset.pfe.example;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import iset.pfe.example.entities.Collecteur;
import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Role;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.CollecteurRepository;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.BonRepository;
import iset.pfe.example.repositories.FournisseurRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
import iset.pfe.example.repositories.ProduitRepository;
import iset.pfe.example.repositories.RoleRepository;
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
	@Autowired
	private OperationTankRepository operationTankRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private CollecteurRepository collecteurRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		 DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	     String currentDateTime = dateFormatter.format(new Date());
	     System.out.println(currentDateTime);
	     
		double a=470;
		Date date1=new Date(12/12/2016);
		Date dateE=new Date(02/02/2021);
		Date dateS=new Date(18/02/2021);
		
		Role role1=new Role("USER");
		roleRepository.save(role1);
		
		
		BCryptPasswordEncoder encoder; 
		encoder = new BCryptPasswordEncoder();
		
				Agriculteur ag=new Agriculteur();
				ag.setAdress("Bizerte");
				ag.setCin(11224412);
				ag.setEmail("ahmed.bensaber@gmail.com");
				ag.setNom("Ben saber");
				ag.setPrenom("Ahmed");
				ag.setTel(22556487);
				ag.setUsername("ahmed");
				encoder = new BCryptPasswordEncoder();
				ag.setPassword(encoder.encode("ahmed"));
				ag.getRoles().add(role1);
				agriculteurRepository.save(ag);
				
				
				
				
				
				
				
				
				Agriculteur ag1 =new Agriculteur();
				ag1.setAdress("Bizerte");
				ag1.setCin(11224412);
				ag1.setEmail("hassen.hassen@gmail.com");
				ag1.setNom("kaabouri");
				ag1.setPrenom("hassen");
				ag1.setTel(22556488);
				ag1.setUsername("hassen");
				encoder = new BCryptPasswordEncoder();
				ag1.setPassword(encoder.encode("hassen"));
				ag1.getRoles().add(role1);
				agriculteurRepository.save(ag1);
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
		
		Agriculteur a1=new Agriculteur("nour", "Guerfali", "nourguerfali08@gmail.com", "Bizerte", 11431134, "nour", "52525252");
		agriculteurRepository.save(a1);
		
		Tank t1=new Tank("tank numero 1", 100.00, 0, "Vide", a1);
		tankRepository.save(t1);
		Tank t2=new Tank("tank numero 2", 100.00, 0, "Vide", a1);
		tankRepository.save(t2);
		Tank t3=new Tank("tank numero 3", 100.00, 0, "Vide", a1);
		tankRepository.save(t3);
		Tank t4=new Tank("tank numero 4", 100.00, 0, "Vide", a1);
		tankRepository.save(t4);
		Tank t5=new Tank("tank numero 5", 100.00, 0, "Vide", a1);
		tankRepository.save(t5);
		
		
		Produit p1=new Produit("VL7 Extra Plus G", "12se54z4s5");
		produitRepository.save(p1);
		
		Produit p2=new Produit("VL7 Tarie G", "1q54z84z5");
		produitRepository.save(p2);
		
		Produit p3=new Produit("NEO-MAX", "1qxs54z5");
		produitRepository.save(p3);
		
		Produit p4=new Produit("Paille de colza", "5cds2dz5");
		produitRepository.save(p4);
		
		Fournisseur f1=new Fournisseur("Ben jemaa", "12ad2546at8");
		f1.setPrenom("Ridha");
		fournisseurRepository.save(f1);
		
		Fournisseur f2=new Fournisseur("Ben mabrouk", "12sc50zat8");
		f2.setPrenom("Mohamed");
		fournisseurRepository.save(f2);
		
		Fournisseur f3=new Fournisseur("Bejjaoui", "s51z46at8");
		f3.setPrenom("Oussema");
		fournisseurRepository.save(f3);
		
		Fournisseur f4=new Fournisseur("Hassen", "1scd41zxs8");
		f4.setPrenom("Kaabouri");
		fournisseurRepository.save(f4);
		
		Collecteur u1=new Collecteur("SMBSA Ettaoufik","Morneg, Ben arous",72458787);
		u1.setMatricule("akdoz6s2z6");
		collecteurRepository.save(u1);
		Collecteur u2=new Collecteur("SMBSA Ennajeh","Beni Kheddache, Madanin",72899899);
		u2.setMatricule("asd5e2dq");
		collecteurRepository.save(u2);
		Collecteur u3=new Collecteur("SMBSA Ettajdid","Sousse, Tunisie",72455541);
		u3.setMatricule("akds5d06s");
		collecteurRepository.save(u3);
		Collecteur u4=new Collecteur("SSA Nour","Eddaly-Utique, Bizerte",72991552);
		u4.setMatricule("as20d5zs6");
		collecteurRepository.save(u4);
		
//		Bon b1=new Bon(150.0, 180.0, "Entree", currentDateTime,a1,p1,f1);
//		bonRepository.save(b1);
		
//		Bon b2=new Bon(140.0, 180.0, "Entree", currentDateTime,a1,p1,f1);
//		bonRepository.save(b2);


	}

}
