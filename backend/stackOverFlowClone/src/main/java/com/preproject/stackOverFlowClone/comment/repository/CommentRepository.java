package com.preproject.stackOverFlowClone.comment.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT a FROM Answer a WHERE a.id = :answerId")
    Answer findByAnswerId(Long answerId);

    @Query("SELECT c FROM Comment c WHERE c.askId = :askId")
    List<Comment> findCommentsByAskId(Long askId);

    @Query("SELECT m.name FROM Member m WHERE m.id = :memberId")
    String findMemberNameByMemberId(Long memberId);
}
