package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import iset.pfe.example.entities.Fournisseur;

public interface FournisseurRepository  extends JpaRepository<Fournisseur,Integer>{
	@Transactional 
	@Modifying
	@Query("delete Fournisseur f where f.idFournisseur=:idFournisseur")
	void deleteFournisseur(@Param("idFournisseur") Integer idFournisseur);
	
}
