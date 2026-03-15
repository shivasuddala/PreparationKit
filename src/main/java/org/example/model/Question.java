package org.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    @ManyToOne
    @JoinColumn(name = "subtopic_id")
    private Subtopic subtopic;
    @ManyToOne
    @JoinColumn(name = "experience_level_id")
    private ExperienceLevel experienceLevel;
    @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
    private Answer answer;
}
