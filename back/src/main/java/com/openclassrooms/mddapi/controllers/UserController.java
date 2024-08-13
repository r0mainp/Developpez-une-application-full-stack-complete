package com.openclassrooms.mddapi.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.payload.request.UserRequest;
import com.openclassrooms.mddapi.payload.response.GenericResponse;
import com.openclassrooms.mddapi.payload.response.UserResponse;
import com.openclassrooms.mddapi.services.UserService;

/**
 * Controller for managing user information.
 * Provides endpoints for retrieving user details by ID and updating user information.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Retrieves user details by user ID.
     * 
     * @param id The ID of the user to retrieve.
     * @return ResponseEntity containing a {@link UserResponse} object if the user is found,
     *         or a 404 Not Found status if the user does not exist,
     *         or a 400 Bad Request status if the ID format is invalid.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        try {
            Optional<UserResponse> userResponse = this.userService.getUserById(Integer.parseInt(id));
            if (userResponse.isPresent()) {
                return ResponseEntity.ok().body(userResponse.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Updates user information based on the provided user request.
     * 
     * @param request The {@link UserRequest} object containing the user information to be updated.
     * @return ResponseEntity containing a {@link GenericResponse} with a success message if the update is successful,
     *         or a 500 Internal Server Error status with an error message if an exception occurs during the update process.
     */
    @PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest request) {
        try {
            userService.updateUser(request);
            GenericResponse response = new GenericResponse("Utilisateur modifié");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            GenericResponse response = new GenericResponse("Erreur lors de la modification");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); 
        }
    }
}
