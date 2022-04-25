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
	private String dateOperation;
	private String typeOp;
	private Integer code=10000;

	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur;
	
	
public Operation(Integer idOperation, double poidsLait, String dateOperation, String typeOp, Integer code,
			Agriculteur agriculteur, Set<OperationTank> operationstank,  Collecteur collecteur) {
		super();
		this.idOperation = idOperation;
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.code = code;
		this.agriculteur = agriculteur;
		this.operationstank = operationstank;
//		this.lait = lait;
		this.collecteur = collecteur;
	}


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
	
	
//	@ManyToOne
//	@JoinColumn(name="idLait")
//	private Lait lait;
	
	@ManyToOne
	@JoinColumn(name="idCollecteur")
	private Collecteur collecteur;
	
	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Operation(double poidsLait, String dateOperation,  String typeOp) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
	}



//	public Operation(double poidsLait, String dateOperation, String typeOp, Integer code,
//			Set<OperationTank> operationstank, Lait lait,Collecteur collecteur) {
//		super();
//		this.poidsLait = poidsLait;
//		this.dateOperation = dateOperation;
//		this.typeOp = typeOp;
//		this.code = code;
//		this.operationstank = operationstank;
//		this.lait = lait;
//		this.collecteur=collecteur;
//	}


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

	public String getDateOperation() {
		return dateOperation;
	}

	public void setDateOperation(String dateOperation) {
		this.dateOperation = dateOperation;
	}

	public String getTypeOp() {
		return typeOp;
	}

	public void setTypeOp(String typeOp) {
		this.typeOp = typeOp;
	}


	public Set<OperationTank> getOperationstank() {
		return operationstank;
	}


	public void setOperationstank(Set<OperationTank> operationstank) {
		this.operationstank = operationstank;
	}


	public Integer getCode() {
		return code;
	}


	public void setCode(Integer code) {
		this.code = code;
	}


	public Collecteur getCollecteur() {
		return collecteur;
	}


	public void setCollecteur(Collecteur collecteur) {
		this.collecteur = collecteur;
	}


	public Agriculteur getAgriculteur() {
		return agriculteur;
	}


	public void setAgriculteur(Agriculteur agriculteur) {
		this.agriculteur = agriculteur;
	}

}