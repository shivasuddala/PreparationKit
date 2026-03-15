import javaTopics from './java';
import springbootTopics from './springboot';
import cicdTopics from './cicd';
import databaseTopics from './database';

export const technologies = [
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: '#f89820',
    gradient: 'linear-gradient(135deg, #f89820 0%, #e76f00 100%)',
    description: 'Core Java from basics to advanced — OOP, Collections, Multithreading, Streams, Design Patterns & more',
    topics: javaTopics
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    icon: '🍃',
    color: '#6db33f',
    gradient: 'linear-gradient(135deg, #6db33f 0%, #4a8c2a 100%)',
    description: 'Spring Framework, REST APIs, JPA, Security, Microservices, Kafka, Redis, Testing & more',
    topics: springbootTopics
  },
  {
    id: 'cicd',
    name: 'CI/CD & DevOps',
    icon: '🚀',
    color: '#2196f3',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)',
    description: 'Git, GitHub, Jenkins, Docker, Kubernetes, Scaling, Deployment Strategies & more',
    topics: cicdTopics
  },
  {
    id: 'database',
    name: 'Database & SQL',
    icon: '🗃️',
    color: '#ff6f00',
    gradient: 'linear-gradient(135deg, #ff6f00 0%, #e65100 100%)',
    description: 'SQL Fundamentals, JOINs, Window Functions, Indexes, Performance, Normalization & more',
    topics: databaseTopics
  }
];

// Search across all technologies
export function searchConcepts(query) {
  if (!query || query.length < 2) return [];
  const lowerQuery = query.toLowerCase();
  const results = [];

  technologies.forEach(tech => {
    tech.topics.forEach(topic => {
      topic.concepts.forEach(concept => {
        const matchScore =
          (concept.title.toLowerCase().includes(lowerQuery) ? 3 : 0) +
          (concept.shortDesc.toLowerCase().includes(lowerQuery) ? 2 : 0) +
          (concept.keyPoints.some(kp => kp.toLowerCase().includes(lowerQuery)) ? 1 : 0);

        if (matchScore > 0) {
          results.push({
            ...concept,
            techName: tech.name,
            techIcon: tech.icon,
            topicName: topic.name,
            matchScore
          });
        }
      });
    });
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

// Get total stats
export function getStats() {
  let totalTopics = 0;
  let totalConcepts = 0;
  let totalExamples = 0;

  technologies.forEach(tech => {
    totalTopics += tech.topics.length;
    tech.topics.forEach(topic => {
      totalConcepts += topic.concepts.length;
      topic.concepts.forEach(concept => {
        totalExamples += (concept.examples || []).length;
      });
    });
  });

  return { totalTopics, totalConcepts, totalExamples, totalTechnologies: technologies.length };
}

