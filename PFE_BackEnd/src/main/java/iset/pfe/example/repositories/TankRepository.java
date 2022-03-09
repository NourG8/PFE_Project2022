package iset.pfe.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Tank;

public interface TankRepository extends JpaRepository<Tank,Integer>{
	@Query("select o from Tank o where o.poidActuel>0 ")
	public List<Tank> findAllTanks();
}
