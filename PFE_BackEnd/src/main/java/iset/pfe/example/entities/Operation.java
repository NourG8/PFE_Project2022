package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
	
	@OneToMany(mappedBy="operation",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Tank> tanks;
	
	@OneToMany(mappedBy="operation",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Vache> vaches ;
	
	public Operation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Operation(double poidsLait, Date dateOperation, String typeOp) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
	}

	public Operation(double poidsLait, Date dateOperation, String typeOp, Set<Tank> tanks) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.tanks = tanks;
	}

	public Operation(double poidsLait, Date dateOperation, String typeOp, Set<Tank> tanks, Set<Vache> vaches) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.tanks = tanks;
		this.vaches = vaches;
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

	public Set<Tank> getTanks() {
		return tanks;
	}

	public void setTanks(Set<Tank> tanks) {
		this.tanks = tanks;
	}

	public Set<Vache> getVaches() {
		return vaches;
	}

	public void setVaches(Set<Vache> vaches) {
		this.vaches = vaches;
	}

}
