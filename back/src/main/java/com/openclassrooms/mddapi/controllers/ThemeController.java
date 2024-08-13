package com.openclassrooms.mddapi.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.services.ThemeService;

/**
 * Controller for managing themes.
 * Provides endpoints to retrieve all themes and to retrieve a specific theme by its ID.
 */
@RestController
@RequestMapping("/api/theme")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    /**
     * Retrieves a list of all themes.
     * 
     * @return ResponseEntity containing a list of {@link Theme} objects.
     */
    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Theme> themes = this.themeService.findAll();
        return ResponseEntity.ok().body(themes);
    }

    /**
     * Retrieves a specific theme by its ID.
     * 
     * @param id The ID of the theme to retrieve.
     * @return ResponseEntity containing the {@link Theme} object if found, or a bad request response if the ID is invalid.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        try {
            Optional<Theme> theme = this.themeService.findById(Integer.parseInt(id));
            
            // Return the theme if found, otherwise respond with a 404 Not Found
            return theme.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
