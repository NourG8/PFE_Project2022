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
	private double prix;
	private String type;
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur ;
	
	@ManyToOne
	@JoinColumn(name="idProduit")
	private Produit produit ;
	
	@ManyToOne
	@JoinColumn(name="idFournisseur")
	private Fournisseur fournisseur;
	
	public Bon() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Bon(double quantite, double prix, String type, Date date) {
		super();
		this.quantite = quantite;
		this.prix = prix;
		this.type = type;
		this.date = date;
	}

//	public Bon(double quantite, double prix, String type, Date date, Agriculteur agriculteur) {
//		super();
//		this.quantite = quantite;
//		this.prix = prix;
//		this.type = type;
//		this.date = date;
//		this.agriculteur = agriculteur;
//	}
//
//	public Bon(double quantite, double prix, String type, Date date, Agriculteur agriculteur, Produit produit) {
//		super();
//		this.quantite = quantite;
//		this.prix = prix;
//		this.type = type;
//		this.date = date;
//		this.agriculteur = agriculteur;
//		this.produit = produit;
//	}

	public Bon(double quantite, double prix, String type, Date date, Agriculteur agriculteur, Produit produit,
			Fournisseur fournisseur) {
		super();
		this.quantite = quantite;
		this.prix = prix;
		this.type = type;
		this.date = date;
		this.agriculteur = agriculteur;
		this.produit = produit;
		this.fournisseur = fournisseur;
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

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Agriculteur getAgriculteur() {
		return agriculteur;
	}

	public void setAgriculteur(Agriculteur agriculteur) {
		this.agriculteur = agriculteur;
	}

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}


}
