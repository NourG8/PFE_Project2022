package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Fournisseur;

public interface FournisseurRepository  extends JpaRepository<Fournisseur,Integer>{

}
