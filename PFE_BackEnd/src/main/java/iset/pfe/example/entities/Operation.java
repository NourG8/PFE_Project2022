package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Operation implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idOperation;
	private double poidsLait;
	private Date dateOperation;
	private String typeOp;

//	@ManyToOne
//	@JoinColumn(name="idTank")
//	private Tank tank;
//	
//	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
//	@JoinTable(
//	 name = "operationTank",
//	 joinColumns = @JoinColumn(name = "idOperation"),
//	 inverseJoinColumns = @JoinColumn(name = "idTank")
//	 )
//	private Set<Tank> tanks= new HashSet<>();
	
	
	@OneToMany(mappedBy="operation",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<OperationTank> operationstank;
	
	
	@ManyToOne
	@JoinColumn(name="idLait")
	private Lait lait;
	
	
	
	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Operation(double poidsLait, Date dateOperation, String typeOp, Set<OperationTank> operationstank,
			Lait lait) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.operationstank = operationstank;
		this.lait = lait;
	}


	public Operation(double poidsLait, Date dateOperation,  String typeOp) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
	}



	public Integer getIdOperation() {
		return idOperation;
	}

	public void setIdOperation(Integer idOperation) {
		this.idOperation = idOperation;
	}

	public double getPoidsLait() {
		return poidsLait;
	}

	public void setPoidsLait(double poidsLait) {
		this.poidsLait = poidsLait;
	}

	public Date getDateOperation() {
		return dateOperation;
	}

	public void setDateOperation(Date dateOperation) {
		this.dateOperation = dateOperation;
	}

	public String getTypeOp() {
		return typeOp;
	}

	public void setTypeOp(String typeOp) {
		this.typeOp = typeOp;
	}


	public Lait getLait() {
		return lait;
	}


	public void setLait(Lait lait) {
		this.lait = lait;
	}


	public Set<OperationTank> getOperationstank() {
		return operationstank;
	}


	public void setOperationstank(Set<OperationTank> operationstank) {
		this.operationstank = operationstank;
	}

}