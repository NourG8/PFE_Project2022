package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Lait implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idLait;
	private int Poid;
	private Date Date_Extraction;
	
	//constructors
	public Lait(Integer idLait, int poid, Date date_Extraction) {
		super();
		this.idLait = idLait;
		Poid = poid;
		Date_Extraction = date_Extraction;
	}	
	public Lait() {
		super();
	}
	
	//getters and settters 
	//id
	public Integer getIdLait() {
		return idLait;
	}

	public void setIdLait(Integer idLait) {
		this.idLait = idLait;
	}
	//poid
	public int getPoid() {
		return Poid;
	}
	public void setPoid(int poid) {
		Poid = poid;
	}
	//Date_Extraction
	public Date getDate_Extraction() {
		return Date_Extraction;
	}
	public void setDate_Extraction(Date date_Extraction) {
		Date_Extraction = date_Extraction;
	}

	
}
