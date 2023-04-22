package com.preproject.stackOverFlowClone.answer.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

//    @Query("SELECT m.nickName FROM Review r JOIN Member m ON r.memberId = m.id WHERE r.memberId = :memberId")
//    String findNickNamesByMemberId(Long memberId);

    @Query("SELECT a FROM Answer a WHERE a.id = :askId")
    List<Answer> findAnswersByAskId(Long askId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Member m WHERE m.id = :memberId")
    boolean existsByMemberId(Long memberId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Ask a WHERE a.id = :askId")
    boolean existsByAskId(@Param("askId") Long askId);
}
