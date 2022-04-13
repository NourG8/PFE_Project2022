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
public class Acheteur implements Serializable{
	@Id
	@GeneratedValue
	private Integer idAcheteur;
	private String nom;
	private String adresse;
	private int tel;
	
	
	@OneToMany(mappedBy="acheteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	
	
	public Integer getIdAcheteur() {
		return idAcheteur;
	}


	public void setIdAcheteur(Integer idAcheteur) {
		this.idAcheteur = idAcheteur;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getAdresse() {
		return adresse;
	}


	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}


	public int getTel() {
		return tel;
	}


	public void setTel(int tel) {
		this.tel = tel;
	}


	public Acheteur() {
		super();
	}


	public Acheteur(Integer idAcheteur, String nom, String adresse, int tel) {
		super();
		this.idAcheteur = idAcheteur;
		this.nom = nom;
		this.adresse = adresse;
		this.tel = tel;
	}
}
