package iset.pfe.example.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Agriculteur implements Serializable , UserDetails{
	
	@Id
	@GeneratedValue
	private Integer idAgriculteur;
	private String nom;
	private String prenom;
	private String email;
	private String adress;
	private int tel;
	private int cin;
	private String username;
	private String password;

	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Tank> tanks;
	
	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Bon> bons;
	
	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="agriculteur_roles" , joinColumns = @JoinColumn(name="idAgriculteur") , inverseJoinColumns=@JoinColumn(name="idRole"))
	@JsonIgnore
	private Set<Role> roles = new HashSet<>();
	
	@OneToMany(mappedBy="agriculteur",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	@JsonIgnore
	private Set<Operation> operations;
	
	
	
	public Agriculteur(Integer idAgriculteur, String nom, String prenom, String email, String adress, int cin,
			String username, String password, Set<Tank> tanks, Set<Bon> bons, Set<Role> roles,
			Set<Operation> operations) {
		super();
		this.idAgriculteur = idAgriculteur;
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.adress = adress;
		this.cin = cin;
		this.username = username;
		this.password = password;
		this.tanks = tanks;
		this.bons = bons;
		this.roles = roles;
		this.operations = operations;
	}


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


	@Override
	public boolean isAccountNonExpired() {
	return false;
	}
	
	@Override
	public boolean isAccountNonLocked() {
	return false;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
	return false;
	}
	
	@Override
	public boolean isEnabled() {
	return false;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<Role> roles = this.getRoles();           
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		            
		            for (Role role : roles) {
		                authorities.add(new SimpleGrantedAuthority(role.getName()));
		            }
		            
		            return authorities;
	}


	public Set<Role> getRoles() {
		return roles;
	}


	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}


	@Override
	public String toString() {
		return "Agriculteur [idAgriculteur=" + idAgriculteur + ", nom=" + nom + ", prenom=" + prenom + ", email="
				+ email + ", adress=" + adress + ", cin=" + cin + ", username=" + username + ", password=" + password
				+ ", tanks=" + tanks + ", bons=" + bons + ", roles=" + roles + "]";
	}


	public Set<Operation> getOperations() {
		return operations;
	}


	public void setOperations(Set<Operation> operations) {
		this.operations = operations;
	}


	public int getTel() {
		return tel;
	}


	public void setTel(int tel) {
		this.tel = tel;
	}
	
	



	
}

