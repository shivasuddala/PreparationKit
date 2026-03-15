package org.example.service;

import org.example.model.Question;
import org.example.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    public List<Question> getQuestionsBySubtopic(Long subtopicId) {
        return questionRepository.findBySubtopicId(subtopicId);
    }

    public List<Question> getQuestionsBySubtopicAndExperienceLevel(Long subtopicId, Long experienceLevelId) {
        return questionRepository.findBySubtopicIdAndExperienceLevelId(subtopicId, experienceLevelId);
    }
}

