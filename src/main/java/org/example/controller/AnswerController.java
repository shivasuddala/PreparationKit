package org.example.controller;

import org.example.model.Answer;
import org.example.service.AnswerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping
    public List<Answer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @GetMapping("/{id}")
    public Answer getAnswerById(@PathVariable Long id) {
        return answerService.getAnswerById(id);
    }
}

