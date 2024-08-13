package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.mapper.UserResponseMapper;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.UserRequest;
import com.openclassrooms.mddapi.payload.response.UserResponse;
import com.openclassrooms.mddapi.repository.UserRepository;

/**
 * Service class for managing {@link User} entities and user-related operations.
 * Provides methods to get user information by ID, get the currently authenticated user,
 * and update user details.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserResponseMapper userResponseMapper;

    /**
     * Retrieves a {@link UserResponse} object by the user's ID.
     * 
     * @param id The ID of the {@link User} to retrieve.
     * @return An {@link Optional} containing the {@link UserResponse} if the user is found, otherwise an empty {@link Optional}.
     */
    public Optional<UserResponse> getUserById(final Integer id) {
        return userRepository.findById(id).map(userResponseMapper::toUserResponse);
    }

    /**
     * Retrieves the currently authenticated user as a {@link UserResponse} object.
     * 
     * @return The {@link UserResponse} of the currently authenticated user, or {@code null} if no user is authenticated.
     */
    public UserResponse getSafeCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            
            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                User user = userRepository.findByEmail(username).orElse(null);
                return userResponseMapper.toUserResponse(user);
            }
        }
        return null;
    }

    /**
     * Retrieves the currently authenticated user as a {@link User} object.
     * 
     * @return The {@link User} of the currently authenticated user, or {@code null} if no user is authenticated.
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            
            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                return userRepository.findByEmail(username).orElse(null);
            }
        }
        return null;
    }

    /**
     * Updates the details of a {@link User} based on the provided {@link UserRequest}.
     * 
     * @param request The {@link UserRequest} containing the new user details.
     * @return The updated {@link User} entity.
     */
    public User updateUser(UserRequest request) {
        User user = userRepository.findById(request.getId())
                .orElse(null);

        if (user != null) {
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            return userRepository.save(user);
        }
        return null;
    }
}