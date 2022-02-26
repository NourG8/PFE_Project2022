package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Nourriture;

public interface NourritureRepository extends JpaRepository<Nourriture,Integer>{

}
