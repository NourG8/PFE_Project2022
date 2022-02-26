package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Tank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idTank;
	private double Poid;
	private double Volume;
	private Date Date_Remplissage;
	private Date Date_Sortie;
	private int Etat;
	
	@ManyToOne
	@JoinColumn(name="idAgriculteur")
	private Agriculteur agriculteur ;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="tanks_laits" , joinColumns = @JoinColumn(name="idTank") , inverseJoinColumns=@JoinColumn(name="idLait"))
	@JsonIgnore
	private Set<Lait> laits= new HashSet<>();
	
	//constructors
	public Tank() {
		super();
	}
	

	//getters and setters 
	
	public Tank(double poid, double volume, Date date_Remplissage, Date date_Sortie, int etat, Agriculteur agriculteur) {
		super();
		Poid = poid;
		Volume = volume;
		Date_Remplissage = date_Remplissage;
		Date_Sortie = date_Sortie;
		Etat = etat;
		this.agriculteur = agriculteur;
	}


	public Tank(double poid, double volume, Date date_Remplissage, Date date_Sortie, int etat, Agriculteur agriculteur,
			Set<Lait> laits) {
		super();
		Poid = poid;
		Volume = volume;
		Date_Remplissage = date_Remplissage;
		Date_Sortie = date_Sortie;
		Etat = etat;
		this.agriculteur = agriculteur;
		this.laits = laits;
	}


	//idTank
	public Integer getIdTank() {
		return idTank;
	}
	public void setIdTank(Integer idTank) {
		this.idTank = idTank;
	}
	//Poid
	public double getPoid() {
		return Poid;
	}
	public void setPoid(double poid) {
		Poid = poid;
	}
	//Volume
	public double getVolume() {
		return Volume;
	}
	public void setVolume(double volume) {
		Volume = volume;
	}	
	//Date_Remplissage	
	public Date getDate_Remplissage() {
		return Date_Remplissage;
	}
	public void setDate_Remplissage(Date date_Remplissage) {
		Date_Remplissage = date_Remplissage;
	}
	//Date_Sortie
	public Date getDate_Sortie() {
		return Date_Sortie;
	}
	public void setDate_Sortie(Date date_Sortie) {
		Date_Sortie = date_Sortie;
	}
	//Etat
	public int getEtat() {
		return Etat;
	}
	public void setEtat(int etat) {
		Etat = etat;
	}

	public Agriculteur getAgriculteur() {
		return agriculteur;
	}

	public void setAgriculteur(Agriculteur agriculteur) {
		this.agriculteur = agriculteur;
	}


	public Set<Lait> getLaits() {
		return laits;
	}


	public void setLaits(Set<Lait> laits) {
		this.laits = laits;
	}
	
}
