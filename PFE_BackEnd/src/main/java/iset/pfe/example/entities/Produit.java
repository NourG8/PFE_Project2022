package iset.pfe.example.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Produit  implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idProduit;
	private String Intitule;
	private int Quantite ;
	private String Qualite;
	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur ;
	
	//constructors
	
	public Produit() {
		super();
	}
	public Produit(Integer idProduit, String intitule, int quantite, String qualite) {
		super();
		this.idProduit = idProduit;
		Intitule = intitule;
		Quantite = quantite;
		Qualite = qualite;
	}
	
	
	
	public Produit(String intitule, int quantite, String qualite, Agriculteur agriculteur) {
		super();
		Intitule = intitule;
		Quantite = quantite;
		Qualite = qualite;
		this.agriculteur = agriculteur;
	}
	//getters and setters 
	
	//Intitule
	public String getIntitule() {
		return Intitule;
	}
	public void setIntitule(String intitule) {
		Intitule = intitule;
	}
	//Quantite
	public int getQuantite() {
		return Quantite;
	}
	public void setQuantite(int quantite) {
		Quantite = quantite;
	}
	//Qualite
	public String getQualite() {
		return Qualite;
	}
	public void setQualite(String qualite) {
		Qualite = qualite;
	}
	public Agriculteur getAgriculteur() {
		return agriculteur;
	}
	public void setAgriculteur(Agriculteur agriculteur) {
		this.agriculteur = agriculteur;
	}
	public Integer getIdProduit() {
		return idProduit;
	}
	public void setIdProduit(Integer idProduit) {
		this.idProduit = idProduit;
	}

	
}
