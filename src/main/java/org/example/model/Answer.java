package org.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shortAnswer;
    @Lob
    private String detailedAnswer;
    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
