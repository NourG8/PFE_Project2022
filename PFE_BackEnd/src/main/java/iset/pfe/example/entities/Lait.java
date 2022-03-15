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
public class Lait  implements Serializable{
	@Id
	@GeneratedValue
	private Integer idLait;
	private String date;
	private double quantite;
	private double quantitePrise;
	private double quantiteRest;
	
	@ManyToOne
	@JoinColumn(name="idVache")
	private Vache vache; 
	
	@OneToMany(mappedBy="lait",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	public Lait( String date, double quantite) {
		super();
		this.date = date;
		this.quantite = quantite;
	}
	
	
	public Lait(String date, double quantite, Vache vache) {
		super();
		this.date = date;
		this.quantite = quantite;
		this.vache = vache;
	}

	
	public Lait(String date, double quantite, double quantitePrise, double quantiteRest, Vache vache) {
		super();
		this.date = date;
		this.quantite = quantite;
		this.quantitePrise = quantitePrise;
		this.quantiteRest = quantiteRest;
		this.vache = vache;
	}


	public Lait(String date, double quantite, double quantitePrise, double quantiteRest, Vache vache,
			Set<Operation> operations) {
		super();
		this.date = date;
		this.quantite = quantite;
		this.quantitePrise = quantitePrise;
		this.quantiteRest = quantiteRest;
		this.vache = vache;
		this.operations = operations;
	}


	public Lait() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Integer getIdLait() {
		return idLait;
	}
	public void setIdLait(Integer idLait) {
		this.idLait = idLait;
	}
	
	public double getQuantite() {
		return quantite;
	}
	public void setQuantite(double quantite) {
		this.quantite = quantite;
	}


	public Vache getVache() {
		return vache;
	}


	public Lait(String date, double quantite, Vache vache, Set<Operation> operations) {
		super();
		this.date = date;
		this.quantite = quantite;
		this.vache = vache;
		this.operations = operations;
	}


	public void setVache(Vache vache) {
		this.vache = vache;
	}


	public Set<Operation> getOperations() {
		return operations;
	}


	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}


	public double getQuantitePrise() {
		return quantitePrise;
	}


	public void setQuantitePrise(double quantitePrise) {
		this.quantitePrise = quantitePrise;
	}


	public double getQuantiteRest() {
		return quantiteRest;
	}


	public void setQuantiteRest(double quantiteRest) {
		this.quantiteRest = quantiteRest;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}
	
}