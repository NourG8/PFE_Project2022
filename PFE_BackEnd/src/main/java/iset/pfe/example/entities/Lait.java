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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Lait implements Serializable{
	
	@Id
	@GeneratedValue
	private Integer idLait;
	private int Poid;
	private Date Date_Extraction;
	
	@ManyToOne
	@JoinColumn(name="idVache")
	private Vache vache;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "laits")
	@JsonIgnore
    private Set<Tank> tanks= new HashSet<>();
	
	//constructors
	public Lait(Integer idLait, int poid, Date date_Extraction) {
		super();
		this.idLait = idLait;
		Poid = poid;
		Date_Extraction = date_Extraction;
	}	
	
	
	public Lait(int poid, Date date_Extraction, Vache vache) {
		super();
		Poid = poid;
		Date_Extraction = date_Extraction;
		this.vache = vache;
	}

	public Lait(int poid, Date date_Extraction, Vache vache, Set<Tank> tanks) {
		super();
		Poid = poid;
		Date_Extraction = date_Extraction;
		this.vache = vache;
		this.tanks = tanks;
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


	public Vache getVache() {
		return vache;
	}


	public void setVache(Vache vache) {
		this.vache = vache;
	}


	public Set<Tank> getTanks() {
		return tanks;
	}


	public void setTanks(Set<Tank> tanks) {
		this.tanks = tanks;
	}
	
}
