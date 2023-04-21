package com.preproject.stackOverFlowClone.answer.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

//    @Query("SELECT m.nickName FROM Review r JOIN Member m ON r.memberId = m.id WHERE r.memberId = :memberId")
//    String findNickNamesByMemberId(Long memberId);

    @Query("SELECT * FROM Answer WHERE Answer.id = :askId")
    List<Answer> findAnswersByAskId(Long askId);
}
