package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(final Integer id) {
        return userRepository.findById(id);
    }
}
