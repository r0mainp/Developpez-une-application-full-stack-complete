package com.openclassrooms.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.Response.AuthResponse;
import com.openclassrooms.mddapi.payload.request.Response.GenericResponse;
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

}
