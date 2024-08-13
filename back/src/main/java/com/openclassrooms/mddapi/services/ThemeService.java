package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;

/**
 * Service class for managing {@link Theme} entities.
 * Provides methods to retrieve all themes and find a theme by its ID.
 */
@Service
public class ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    /**
     * Retrieves all {@link Theme} entities from the repository.
     * 
     * @return A list of {@link Theme} entities.
     */
    public List<Theme> findAll() {
        return this.themeRepository.findAll();
    }

    /**
     * Retrieves a {@link Theme} entity by its ID.
     * 
     * @param id The ID of the {@link Theme} to retrieve.
     * @return An {@link Optional} containing the {@link Theme} if found, or an empty {@link Optional} if not found.
     */
    public Optional<Theme> findById(Integer id) {
        return this.themeRepository.findById(id);
    }
}
