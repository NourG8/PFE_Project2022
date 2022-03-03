package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Fournisseur implements Serializable{
	@Id
	@GeneratedValue
	private Integer idFournisseur;
	private String nom;
	private String matricule;
	
	@OneToMany(mappedBy="fournisseur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Bon> bons;
	
	public Fournisseur() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fournisseur(String nom, String matricule) {
		super();
		this.nom = nom;
		this.matricule = matricule;
	}
	

	public Fournisseur(String nom, String matricule, Set<Bon> bons) {
		super();
		this.nom = nom;
		this.matricule = matricule;
		this.bons = bons;
	}

	public Integer getIdFournisseur() {
		return idFournisseur;
	}

	public void setIdFournisseur(Integer idFournisseur) {
		this.idFournisseur = idFournisseur;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMatricule() {
		return matricule;
	}

	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}

	public Set<Bon> getBons() {
		return bons;
	}

	public void setBons(Set<Bon> bons) {
		this.bons = bons;
	}
	
	
	
}
