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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class OperationTank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idOpTank;
	private String date;
	private double qteInsereTank;
	
//	@OneToMany(mappedBy="operationTank",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
//	@JsonIgnore
//	private Set<Operation> operations;
//	
//
//	@OneToMany(mappedBy="operationTank",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
//	@JsonIgnore
//	private Set<Tank> tanks;
	
	@ManyToOne
	@JoinColumn(name="idOperation")
	private Operation operation;
	
	@ManyToOne
	@JoinColumn(name="idTank")
	private Tank tank;
	
	public OperationTank() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public OperationTank(String date) {
		super();
		this.date = date;
	}


	public OperationTank(String date, Operation operation, Tank tank) {
		super();
		this.date = date;
		this.operation = operation;
		this.tank = tank;
	}

	
	public OperationTank(String date, double qteInsereTank, Operation operation, Tank tank) {
		super();
		this.date = date;
		this.qteInsereTank = qteInsereTank;
		this.operation = operation;
		this.tank = tank;
	}

	public Integer getIdOpTank() {
		return idOpTank;
	}

	public void setIdOpTank(Integer idOpTank) {
		this.idOpTank = idOpTank;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Operation getOperation() {
		return operation;
	}

	public void setOperation(Operation operation) {
		this.operation = operation;
	}

	public Tank getTank() {
		return tank;
	}

	public void setTank(Tank tank) {
		this.tank = tank;
	}

	public double getQteInsereTank() {
		return qteInsereTank;
	}

	public void setQteInsereTank(double qteInsereTank) {
		this.qteInsereTank = qteInsereTank;
	}

	@Override
	public String toString() {
		return "OperationTank [idOpTank=" + idOpTank + ", date=" + date + ", qteInsereTank=" + qteInsereTank
				+ ", operation=" + operation + ", tank=" + tank + "]";
	}

}
