package com.preproject.stackOverFlowClone.comment.repository;

import com.preproject.stackOverFlowClone.answer.Answer;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT a FROM Answer a WHERE a.id = :answerId")
    Answer findByAnswerId(Long answerId);

}