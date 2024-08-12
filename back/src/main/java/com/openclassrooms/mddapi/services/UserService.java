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

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserResponseMapper userResponseMapper;

    public Optional<UserResponse> getUserById(final Integer id) {
        return userRepository.findById(id).map(userResponseMapper::toUserResponse);
    }

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

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            
            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                User user = userRepository.findByEmail(username).orElse(null);
                return user;
            }
        }
        return null;
    }

    public User updateUser(UserRequest request) {
        User user = userRepository.findById(request.getId())
                .orElse(null);

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        return userRepository.save(user);
    }
}
