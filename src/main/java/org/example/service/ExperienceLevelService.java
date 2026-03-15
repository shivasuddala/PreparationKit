package org.example.service;

import org.example.model.ExperienceLevel;
import org.example.repository.ExperienceLevelRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExperienceLevelService {
    private final ExperienceLevelRepository experienceLevelRepository;

    public ExperienceLevelService(ExperienceLevelRepository experienceLevelRepository) {
        this.experienceLevelRepository = experienceLevelRepository;
    }

    public List<ExperienceLevel> getAllExperienceLevels() {
        return experienceLevelRepository.findAll();
    }

    public ExperienceLevel getExperienceLevelById(Long id) {
        return experienceLevelRepository.findById(id).orElse(null);
    }
}

