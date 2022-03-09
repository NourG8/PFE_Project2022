package iset.pfe.example.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import iset.pfe.example.entities.Lait;

public interface LaitRepository extends JpaRepository<Lait,Integer>{
	@Query("select o from Lait  o where o.quantiteRest!=0 ")
	public List<Lait> findAllLaits();
}
