package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Tank implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idTank;
	private int Poid;
	private int Volume;
	private Date Date_Remplissage;
	private Date Date_Sortie;
	private Boolean Etat;
	//constructors
	public Tank() {
		super();
	}
	
	public Tank(Integer idTank, int poid, int volume, Date date_Remplissage, Date date_Sortie, Boolean etat) {
		super();
		this.idTank = idTank;
		Poid = poid;
		Volume = volume;
		Date_Remplissage = date_Remplissage;
		Date_Sortie = date_Sortie;
		Etat = etat;
	}
	//getters and setters 
	
	//idTank
	public Integer getIdTank() {
		return idTank;
	}
	public void setIdTank(Integer idTank) {
		this.idTank = idTank;
	}
	//Poid
	public int getPoid() {
		return Poid;
	}
	public void setPoid(int poid) {
		Poid = poid;
	}
	//Volume
	public int getVolume() {
		return Volume;
	}
	public void setVolume(int volume) {
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
	public Boolean getEtat() {
		return Etat;
	}
	public void setEtat(Boolean etat) {
		Etat = etat;
	}
}
