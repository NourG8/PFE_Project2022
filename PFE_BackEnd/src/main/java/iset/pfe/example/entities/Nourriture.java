package iset.pfe.example.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Nourriture  implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idNourriture;
	private String Intitule;
	private int Quantite ;
	private String Qualite;
	
	//constructors
	
	public Nourriture() {
		super();
	}
	public Nourriture(Integer idNourriture, String intitule, int quantite, String qualite) {
		super();
		this.idNourriture = idNourriture;
		Intitule = intitule;
		Quantite = quantite;
		Qualite = qualite;
	}
	
	//getters and setters 
	//id
	public Integer getIdNourriture() {
		return idNourriture;
	}
	public void setIdNourriture(Integer idNourriture) {
		this.idNourriture = idNourriture;
	}
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
	

	
	
}
