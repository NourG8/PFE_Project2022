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
public class Vache implements Serializable{
	@Id
	@GeneratedValue
	private Integer idVache;
	private String matricule;
	private double poids;
	private String race;
	private Date dateNaissance;
	private String etat;
	private double qte_prodLait;
	
	@OneToMany(mappedBy="vache",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Lait> laits;
	
	
	public Vache() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public Vache(String matricule, double poids, String race, Date dateNaissance, String etat, double qte_prodLait) {
		super();
		this.matricule = matricule;
		this.poids = poids;
		this.race = race;
		this.dateNaissance = dateNaissance;
		this.etat = etat;
		this.qte_prodLait = qte_prodLait;
	}


	public Vache(String matricule, double poids, String race, Date dateNaissance, String etat, double qte_prodLait,
			Set<Lait> laits) {
		super();
		this.matricule = matricule;
		this.poids = poids;
		this.race = race;
		this.dateNaissance = dateNaissance;
		this.etat = etat;
		this.qte_prodLait = qte_prodLait;
		this.laits = laits;
	}


	public Integer getIdVache() {
		return idVache;
	}

	public void setIdVache(Integer idVache) {
		this.idVache = idVache;
	}

	public double getPoids() {
		return poids;
	}

	public void setPoids(double poids) {
		this.poids = poids;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public double getQte_prodLait() {
		return qte_prodLait;
	}

	public void setQte_prodLait(double qte_prodLait) {
		this.qte_prodLait = qte_prodLait;
	}


	public String getMatricule() {
		return matricule;
	}


	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}


	public Set<Lait> getLaits() {
		return laits;
	}


	public void setLaits(Set<Lait> laits) {
		this.laits = laits;
	}
	
}
