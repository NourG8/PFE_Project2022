package iset.pfe.example;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Fournisseur;
import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;
import iset.pfe.example.entities.Produit;
import iset.pfe.example.entities.Tank;
import iset.pfe.example.entities.Vache;
import iset.pfe.example.repositories.AgriculteurRepository;
import iset.pfe.example.repositories.BonRepository;
import iset.pfe.example.repositories.FournisseurRepository;
import iset.pfe.example.repositories.LaitRepository;
import iset.pfe.example.repositories.OperationRepository;
import iset.pfe.example.repositories.OperationTankRepository;
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
	@Autowired
	private LaitRepository laitRepository;
	@Autowired
	private OperationTankRepository operationTankRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(PfeBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		double a=470;
		Date date1=new Date(12/12/2016);
		Date dateE=new Date(02/02/2021);
		Date dateS=new Date(18/02/2021);
		
		Agriculteur a1=new Agriculteur("nour", "Guerfali", "nourguerfali08@gmail.com", "Bizerte", 11431134, "nour", "1234");
		agriculteurRepository.save(a1);
		
		Vache v1=new Vache("vache numero 1",180.00, "race 1", date1, "malade", 23.5);
		vacheRepository.save(v1);
		
		Tank t1=new Tank("tank numero 1", 100.00, 0, "Remplis", a1);
		tankRepository.save(t1);
		Tank t2=new Tank("tank numero 2", 100.00, 0, "Remplis", a1);
		tankRepository.save(t2);
		Tank t3=new Tank("tank numero 3", 100.00, 0, "Remplis", a1);
		tankRepository.save(t3);
		Tank t4=new Tank("tank numero 4", 120.00, 0, "Remplis", a1);
		tankRepository.save(t4);
		Tank t5=new Tank("tank numero 5", 120.00, 0, "Remplis", a1);
		tankRepository.save(t5);
		Tank t6=new Tank("tank numero 6", 120.00, 0, "Remplis", a1);
		tankRepository.save(t6);
		Tank t7=new Tank("tank numero 7", 100.00, 0, "Remplis", a1);
		tankRepository.save(t7);
		
		
		Produit p1=new Produit("Prod 1", "12se54z5");
		produitRepository.save(p1);
		
		Produit p2=new Produit("Prod 2", "12se54z5");
		produitRepository.save(p2);
		
		Fournisseur f1=new Fournisseur("mohamed", "12ad2546at8");
		fournisseurRepository.save(f1);
		
		Bon b1=new Bon(150.0, 180.0, "Entree", date1,a1,p1,f1);
		bonRepository.save(b1);
		
		Bon b2=new Bon(140.0, 180.0, "Entree", date1,a1,p1,f1);
		bonRepository.save(b2);
		
		Bon b3=new Bon(120.0, 180.0, "Sortie", date1,a1,p1,f1);
		bonRepository.save(b3);
		
		Bon b4=new Bon(110.0, 180.0, "Entree", date1,a1,p2,f1);
		bonRepository.save(b4);
		
		
		
		Lait l1=new Lait(date1, 20, 0, 20, v1);
		laitRepository.save(l1);
		
//		Operation op1=new Operation(35, date1, "Remplissage", l1);
//		operationRepository.save(op1);
		
		Operation o1=new Operation( 200, date1, "Remplissage");
		operationRepository.save(o1);
		
//		OperationTank opt1=new OperationTank(date1);
//	    opt1.setOperation(o1);
//	    opt1.setTank(t7);
//		operationTankRepository.save(opt1);

		
			
for(int i=0;i<tankRepository.findAll().size();i++) {
			
			Tank tank2=tankRepository.findAll().get(i);
			
			if(tank2.getPoidActuel()==tank2.getPoidVide()) {
			tank2.setEtat("Totalement remplis");
			tankRepository.save(tank2);
			}
			else if(tank2.getPoidActuel()==0) {
				tank2.setEtat("Non remplis");
				tankRepository.save(tank2);
				}
			else if(tank2.getPoidActuel()<tank2.getPoidVide()) {
				tank2.setEtat("En cours");
				tankRepository.save(tank2);
				}
			
			
		}
//la quantite generale de lait inserée dans les tanks :
double qteGeneraleLait=0;
for(int i=0;i<tankRepository.findAll().size();i++) {
	Tank tank2=tankRepository.findAll().get(i);
	qteGeneraleLait=qteGeneraleLait+tank2.getPoidActuel();
}
System.out.println("######"+qteGeneraleLait);



//la quantite libre de lait :
double qte=0;
double qteLibreLait=0;
for(int j=0;j<tankRepository.findAll().size();j++) {
	Tank tank3=tankRepository.findAll().get(j);
	qte=qte+tank3.getPoidVide();
}

qteLibreLait=qte-qteGeneraleLait;
System.out.println("######"+qteLibreLait);


for(int i=0;i<bonRepository.findAllBon("Entree").size();i++) {
	Integer id=new Integer( bonRepository.findAllBon("Entree").get(i).split(",")[1]);
	Double Qte=new Double(bonRepository.findAllBon("Entree").get(i).split(",")[0]);

	
    Produit p=produitRepository.findById(id).get();
    p.setQte(p.getQte()+Qte);
    produitRepository.save(p);
}

for(int i=0;i<bonRepository.findAllBon("Sortie").size();i++) {
	Integer id=new Integer( bonRepository.findAllBon("Sortie").get(i).split(",")[1]);
	Double Qte=new Double(bonRepository.findAllBon("Sortie").get(i).split(",")[0]);

	
    Produit p=produitRepository.findById(id).get();
    p.setQte(p.getQte()-Qte);
    produitRepository.save(p);
}
		


	}

}
