package iset.pfe.example.entities;

import java.io.Serializable;
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
public class Produit  implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idProduit;
	private String intitule;
	private String libelle;
	
	@OneToMany(mappedBy="produit",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Bon> bons;
	
	//constructors
	
	
	public Produit() {
		super();
	}

	public Produit(String intitule, String libelle) {
		super();
		this.intitule = intitule;
		this.libelle = libelle;
	}


	public Produit(String intitule, String libelle, Set<Bon> bons) {
		super();
		this.intitule = intitule;
		this.libelle = libelle;
		this.bons = bons;
	}

	public Integer getIdProduit() {
		return idProduit;
	}

	public void setIdProduit(Integer idProduit) {
		this.idProduit = idProduit;
	}

	public String getIntitule() {
		return intitule;
	}

	public void setIntitule(String intitule) {
		this.intitule = intitule;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Set<Bon> getBons() {
		return bons;
	}

	public void setBons(Set<Bon> bons) {
		this.bons = bons;
	}
	
	
}
