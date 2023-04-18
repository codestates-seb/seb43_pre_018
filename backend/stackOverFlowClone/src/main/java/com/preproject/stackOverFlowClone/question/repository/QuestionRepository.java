package com.preproject.stackOverFlowClone.question.repository;

import com.preproject.stackOverFlowClone.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
