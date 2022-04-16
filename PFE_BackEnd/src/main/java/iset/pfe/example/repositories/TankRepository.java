package iset.pfe.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Tank;

public interface TankRepository extends JpaRepository<Tank,Integer>{
	@Query("select o from Tank o where o.poidActuel>0 ")
	public List<Tank> findAllTanks();
	
	@Query("select o from Tank o where o.poidActuel>0 and o.poidActuel<o.poidVide ")
	public List<Tank> findTanksNonTotalementRemplis();
	
		//liste des tanks Remplis
		@Query("select o from Tank o where o.poidActuel=o.poidVide ")
		public List<Tank> findTanksRemplis();
	
	 	//liste des tanks libres
		@Query("select o from Tank o where o.poidActuel=0 ")
		public List<Tank> findTanksNonRemplis();
		
		 
		@Transactional 
		@Modifying
		@Query("delete Tank t where t.idTank=:idTank")
		void deleteTank(@Param("idTank") Integer idTank);
		
		  @Query("select t from Tank t where t.etat=:etat")
			public List<Tank> findTankEtat(@Param("etat") String etat);
	
	
}
