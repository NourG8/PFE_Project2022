package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.entities.Bon;
import iset.pfe.example.entities.Operation;

public interface BonRepository extends JpaRepository<Bon,Integer>{
	@Transactional 
	@Modifying
	@Query("delete Bon u where u.idBon=:idBon")
	void deleteBon(@Param("idBon") Integer idBon);
	
	
	@Transactional  
	@Modifying
	@Query("update Bon u  set u.idBon=:idBon,u.quantite=:quantite, u.prix=:prix, u.type=:type, u.date=:date, u.agriculteur=:agriculteur where u.idBon=:idBon")
	void updateBon(@Param("idBon") Integer idBon,double quantite,double prix,String type,Date date, Agriculteur agriculteur);
	
	 @Query("select sum(b.quantite),b.produit.idProduit from Bon b join b.produit p where b.type=:type  group by b.produit.idProduit ,b.type ")
		public List<String>findAllBon(@Param("type") String type);
	 
	 @Query("select b from Bon b where b.type=:type")
		public List<Bon>findAllBonSortie(@Param("type") String type);
}
