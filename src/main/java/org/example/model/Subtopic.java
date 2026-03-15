package org.example.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subtopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;
    @OneToMany(mappedBy = "subtopic", cascade = CascadeType.ALL)
    private List<Question> questions;
}
