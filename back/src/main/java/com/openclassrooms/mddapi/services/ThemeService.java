package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;

@Service
public class ThemeService {
    private ThemeRepository themeRepository;

    public List<Theme> findAll(){
        return this.themeRepository.findAll();
    }

    public Theme findById(Integer id){
        return this.themeRepository.findById(id).orElse(null);
    }

}
