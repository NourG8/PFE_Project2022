package iset.pfe.example.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import iset.pfe.example.entities.Agriculteur;

public interface AgriculteurRepository extends JpaRepository<Agriculteur,Integer>{
	@Query(" select u from Agriculteur u where u.username = ?1")
	Optional<Agriculteur> findUserWithName(String username);
}
