package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Bon implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idBon;
	private double quantite;
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur ;
	
	@ManyToOne
	@JoinColumn(name="idProduit")
	private Produit produit ;
	
	public Bon() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Bon(double quantite, Date date) {
		super();
		this.quantite = quantite;
		this.date = date;
	}

	public Integer getIdBon() {
		return idBon;
	}

	public void setIdBon(Integer idBon) {
		this.idBon = idBon;
	}

	public double getQuantite() {
		return quantite;
	}

	public void setQuantite(double quantite) {
		this.quantite = quantite;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
