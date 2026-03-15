package org.example.controller;

import org.example.model.Question;
import org.example.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<Question> getAllQuestions(
            @RequestParam(required = false) Long subtopicId,
            @RequestParam(required = false) Long experienceLevelId) {

        if (subtopicId != null && experienceLevelId != null) {
            return questionService.getQuestionsBySubtopicAndExperienceLevel(subtopicId, experienceLevelId);
        } else if (subtopicId != null) {
            return questionService.getQuestionsBySubtopic(subtopicId);
        }
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }
}

