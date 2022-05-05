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
public class Collecteur implements Serializable{
	@Id
	@GeneratedValue
	private Integer idCollecteur;
	private String nomCollecteur;
	private String prenomCollecteur;
	private String matricule;
	private String adresse;
	private int tel;
	
	
	@OneToMany(mappedBy="collecteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;


	public Collecteur(Integer idCollecteur, String nomCollecteur, String adresse, int tel, Set<Operation> operations) {
		super();
		this.idCollecteur = idCollecteur;
		this.nomCollecteur = nomCollecteur;
		this.adresse = adresse;
		this.tel = tel;
		this.operations = operations;
	}
	
	public Collecteur(String nomCollecteur, String adresse, int tel) {
		super();
		this.nomCollecteur = nomCollecteur;
		this.adresse = adresse;
		this.tel = tel;
	}
	
	

	public Integer getIdCollecteur() {
		return idCollecteur;
	}


	public void setIdCollecteur(Integer idCollecteur) {
		this.idCollecteur = idCollecteur;
	}


	public String getNomCollecteur() {
		return nomCollecteur;
	}


	public void setNomCollecteur(String nomCollecteur) {
		this.nomCollecteur = nomCollecteur;
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


	public Set<Operation> getOperations() {
		return operations;
	}


	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}


	public Collecteur() {
		super();
	}

	public String getMatricule() {
		return matricule;
	}

	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}

	public String getPrenomCollecteur() {
		return prenomCollecteur;
	}

	public void setPrenomCollecteur(String prenomCollecteur) {
		this.prenomCollecteur = prenomCollecteur;
	}
	
}
