package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Bon;

public interface BonRepository extends JpaRepository<Bon,Integer>{

}
