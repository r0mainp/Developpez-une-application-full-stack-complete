package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank
    private String email;

	@NotBlank
	private String password;

    @NotBlank
    private String username;

    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
