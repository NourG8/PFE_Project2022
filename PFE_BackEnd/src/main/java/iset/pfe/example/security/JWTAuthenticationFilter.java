package iset.pfe.example.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import iset.pfe.example.entities.Agriculteur;
import iset.pfe.example.security.SecurityParams;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	 private AuthenticationManager authenticationManager;
	 public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
	 this.authenticationManager = authenticationManager;
	 }
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse
	response) throws AuthenticationException {
	 try {
	 Agriculteur appUser= new ObjectMapper().readValue(request.getInputStream(),Agriculteur.class);
	 return authenticationManager.authenticate(new
	UsernamePasswordAuthenticationToken(appUser.getUsername(),appUser.getPassword()));
	 } catch (IOException e) {
	 e.printStackTrace();
	 throw new RuntimeException(e);
	 }
	 }
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse
	response, FilterChain chain, Authentication authResult) throws IOException, ServletException
	{
	 org.springframework.security.core.userdetails.User user=(org.springframework.security.core.userdetails.User)authResult.getPrincipal();
	 List<String> roles=new ArrayList<>();
	 authResult.getAuthorities().forEach(a->{
	 roles.add(a.getAuthority());
	 });
	 String jwt= JWT.create()
	 .withIssuer(request.getRequestURI())
	 .withSubject(user.getUsername())
	 .withArrayClaim("roles",roles.toArray(new String[roles.size()]))
	 .withExpiresAt(new Date(System.currentTimeMillis()+SecurityParams.EXPIRATION))
	 .sign(Algorithm.HMAC256(SecurityParams.SECRET));
	 response.addHeader(SecurityParams.JWT_HEADER_NAME,jwt); }
	} 