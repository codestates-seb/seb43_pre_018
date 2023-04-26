package com.preproject.stackOverFlowClone.answer.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a WHERE a.askId = :askId")
    List<Answer> findAnswersByAskId(Long askId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Ask a WHERE a.id = :askId")
    boolean existsByAskId(@Param("askId") Long askId);

    Page<Answer> findAllByAskId(Long askId, Pageable pageable);
}
