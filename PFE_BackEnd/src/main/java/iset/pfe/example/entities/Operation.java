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
	private double poids;
	private double volume;
	private Date dateRemplissage;
	
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


	public Operation(double poids, double volume, Date dateRemplissage) {
		super();
		this.poids = poids;
		this.volume = volume;
		this.dateRemplissage = dateRemplissage;
	}

	public double getPoids() {
		return poids;
	}


	public void setPoids(double poids) {
		this.poids = poids;
	}


	public double getVolume() {
		return volume;
	}


	public void setVolume(double volume) {
		this.volume = volume;
	}


	public Date getDateRemplissage() {
		return dateRemplissage;
	}


	public void setDateRemplissage(Date dateRemplissage) {
		this.dateRemplissage = dateRemplissage;
	}


	public Integer getIdOperation() {
		return idOperation;
	}


	public void setIdOperation(Integer idOperation) {
		this.idOperation = idOperation;
	}
	

}
