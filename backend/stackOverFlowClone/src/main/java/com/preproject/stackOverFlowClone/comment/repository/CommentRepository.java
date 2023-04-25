package com.preproject.stackOverFlowClone.comment.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT a FROM Answer a WHERE a.id = :answerId")
    Answer findByAnswerId(Long answerId);

    @Query("SELECT c FROM Comment c WHERE c.answerId = :answerId")
    List<Comment> findAllByAnswerId(Long answerId);

    @Query("SELECT c FROM Comment c WHERE c.askId = :askId")
    List<Comment> findCommentsByAskId(Long askId);

    @Query("SELECT m.name FROM Member m WHERE m.id = :memberId")
    Optional<String> findMemberNameByMemberId(Long memberId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Member m WHERE m.id = :memberId")
    boolean existsByMemberId(Long memberId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Ask m WHERE m.id = :askId")
    boolean existsByAskId(Long askId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Answer m WHERE m.id = :answerId")
    boolean existsByAnswerId(Long answerId);

    @Query("SELECT c FROM Comment c WHERE c.answerId = :answerId")
    Page<Comment> findAll(Long answerId, Pageable pageable);

    @Query("SELECT c FROM Comment c WHERE c.answerId = :answerId")
    List<Comment> findCommentsByAnswerId(Long answerId);
}
