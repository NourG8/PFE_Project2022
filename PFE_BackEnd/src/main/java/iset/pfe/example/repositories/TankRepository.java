package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.Agriculteur;

public interface TankRepository extends JpaRepository<Agriculteur,Integer>{

}
