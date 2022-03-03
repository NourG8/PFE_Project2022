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
public class Agriculteur implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idAgriculteur;
	private String nom;
	private String prenom;
	private String email;
	private String adress;
	private int cin;
	private String username;
	private String password;

	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Tank> tanks;
	
	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Bon> bons;
	

	public Agriculteur() {
		super();
	}


	public Agriculteur(String nom, String prenom, String email, String adress, int cin, String username,
			String password) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.cin = cin;
		this.username = username;
		this.password = password;
	}


	public Agriculteur(String nom, String prenom, String email, String adress, int cin, String username,
			String password, Set<Tank> tanks, Set<Bon> bons) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.cin = cin;
		this.username = username;
		this.password = password;
		this.tanks = tanks;
		this.bons = bons;
	}


	public Integer getIdAgriculteur() {
		return idAgriculteur;
	}


	public void setIdAgriculteur(Integer idAgriculteur) {
		this.idAgriculteur = idAgriculteur;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getAdress() {
		return adress;
	}


	public void setAdress(String adress) {
		this.adress = adress;
	}


	public int getCin() {
		return cin;
	}


	public void setCin(int cin) {
		this.cin = cin;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public Set<Tank> getTanks() {
		return tanks;
	}


	public void setTanks(Set<Tank> tanks) {
		this.tanks = tanks;
	}


	public Set<Bon> getBons() {
		return bons;
	}


	public void setBons(Set<Bon> bons) {
		this.bons = bons;
	}
	

}
