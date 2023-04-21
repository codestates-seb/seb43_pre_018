package com.preproject.stackOverFlowClone.answer.repository;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

//    @Query("SELECT m.nickName FROM Review r JOIN Member m ON r.memberId = m.id WHERE r.memberId = :memberId")
//    String findNickNamesByMemberId(Long memberId);


}
