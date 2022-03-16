package iset.pfe.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import iset.pfe.example.entities.Lait;
import iset.pfe.example.entities.Operation;
import iset.pfe.example.entities.OperationTank;

public interface OperationRepository extends JpaRepository<Operation,Integer>{
   @Query("select o from OperationTank  o")
	public List<OperationTank> findAllOperationsTank();
   
   @Query("select o from OperationTank  o where o.idOpTank=:idOpTank")
	public OperationTank getOperationTank(@Param("idOpTank") Integer idOpTank);
   
   @Query("select op from Operation op where op.typeOp=:typeOp")
	public List<Operation> findAllOperationsRemplissages(@Param("typeOp") String typeOp);
   
   
}
