package org.example.service;

import org.example.model.Subtopic;
import org.example.repository.SubtopicRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubtopicService {
    private final SubtopicRepository subtopicRepository;

    public SubtopicService(SubtopicRepository subtopicRepository) {
        this.subtopicRepository = subtopicRepository;
    }

    public List<Subtopic> getAllSubtopics() {
        return subtopicRepository.findAll();
    }

    public Subtopic getSubtopicById(Long id) {
        return subtopicRepository.findById(id).orElse(null);
    }
}

