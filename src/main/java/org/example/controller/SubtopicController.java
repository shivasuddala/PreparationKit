package org.example.controller;

import org.example.model.Subtopic;
import org.example.service.SubtopicService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subtopics")
@CrossOrigin
public class SubtopicController {
    private final SubtopicService subtopicService;

    public SubtopicController(SubtopicService subtopicService) {
        this.subtopicService = subtopicService;
    }

    @GetMapping
    public List<Subtopic> getAllSubtopics() {
        return subtopicService.getAllSubtopics();
    }

    @GetMapping("/{id}")
    public Subtopic getSubtopicById(@PathVariable Long id) {
        return subtopicService.getSubtopicById(id);
    }
}

