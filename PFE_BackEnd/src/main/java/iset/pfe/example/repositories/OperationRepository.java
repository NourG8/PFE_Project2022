package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import iset.pfe.example.entities.Operation;

public interface OperationRepository extends JpaRepository<Operation,Integer>{

}
