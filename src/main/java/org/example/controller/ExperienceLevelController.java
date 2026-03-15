package org.example.controller;

import org.example.model.ExperienceLevel;
import org.example.service.ExperienceLevelService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/experience-levels")
@CrossOrigin
public class ExperienceLevelController {
    private final ExperienceLevelService experienceLevelService;

    public ExperienceLevelController(ExperienceLevelService experienceLevelService) {
        this.experienceLevelService = experienceLevelService;
    }

    @GetMapping
    public List<ExperienceLevel> getAllExperienceLevels() {
        return experienceLevelService.getAllExperienceLevels();
    }

    @GetMapping("/{id}")
    public ExperienceLevel getExperienceLevelById(@PathVariable Long id) {
        return experienceLevelService.getExperienceLevelById(id);
    }
}

