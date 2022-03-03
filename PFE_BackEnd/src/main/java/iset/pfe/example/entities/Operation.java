package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

	@ManyToOne
	@JoinColumn(name="idTank")
	private Tank tank;
	
	@ManyToOne
	@JoinColumn(name="idVache")
	private Vache vache;
	
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

	public Operation(double poidsLait, Date dateOperation, String typeOp, Tank tank, Vache vache) {
		super();
		this.poidsLait = poidsLait;
		this.dateOperation = dateOperation;
		this.typeOp = typeOp;
		this.tank = tank;
		this.vache = vache;
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

	public Tank getTank() {
		return tank;
	}

	public void setTank(Tank tank) {
		this.tank = tank;
	}

	public Vache getVache() {
		return vache;
	}

	public void setVache(Vache vache) {
		this.vache = vache;
	}


}
