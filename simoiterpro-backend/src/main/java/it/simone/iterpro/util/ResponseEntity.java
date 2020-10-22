package it.simone.iterpro.util;

import java.io.Serializable;

public class ResponseEntity implements Serializable {
	
	private static final long serialVersionUID = 7438801690268679015L;
	
	private boolean ok;
	private String message;
	
	public boolean isOk() {
		return ok;
	}
	public void setOk(boolean ok) {
		this.ok = ok;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
