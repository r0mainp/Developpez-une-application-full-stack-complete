package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.RegisterRequest;
import com.openclassrooms.mddapi.payload.response.AuthResponse;
import com.openclassrooms.mddapi.payload.response.GenericResponse;
import com.openclassrooms.mddapi.payload.response.UserResponse;
import com.openclassrooms.mddapi.security.jwt.JwtUtils;
import com.openclassrooms.mddapi.services.AuthenticationService;

@RequestMapping("/api/auth")
@RestController
public class AuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest request) {
        try {
            User authenticatedUser = authenticationService.authenticate(request);

            String jwtToken = jwtUtils.generateToken(authenticatedUser);
            AuthResponse response = new AuthResponse(jwtToken);

            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException ex) {
            GenericResponse errorResponse = new GenericResponse("Wrong credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User registeredUser = authenticationService.register(request);

            String jwtToken = jwtUtils.generateToken(registeredUser);
            AuthResponse response = new AuthResponse(jwtToken);

            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException ex) {
            GenericResponse errorResponse = new GenericResponse("User already exits.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }
    }

    public ResponseEntity<?> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        /*
            Handle case where user tries to access /me without being authenticated 
            (Error in terminal when casting `authentication.getPrincipal()` to User class)
        */ 
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof User)) {
            GenericResponse errorResponse = new GenericResponse("Forbidden");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        User currentUser = (User) authentication.getPrincipal();

        UserResponse userDetails = new UserResponse(
            currentUser.getId(),
            currentUser.getUsername(),
            currentUser.getEmail(),
            currentUser.getCreatedAt(),
            currentUser.getUpdatedAt()
        );

        return ResponseEntity.ok(userDetails);
    }

}
