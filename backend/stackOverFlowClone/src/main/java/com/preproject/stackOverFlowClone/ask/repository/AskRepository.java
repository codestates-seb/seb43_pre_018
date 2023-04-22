package com.preproject.stackOverFlowClone.ask.repository;

import com.preproject.stackOverFlowClone.ask.entity.Ask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AskRepository extends JpaRepository<Ask, Long> {
    @Query("SELECT a FROM Ask a WHERE a.title LIKE :searchWord")
    List<Ask> findSearchAskList(String searchWord);

    @Modifying // Void를 사용하기 위해 jpaRepository에 변경작업만 한다고 알려주는 애너테이션
    @Transactional // @Modifying을 사용하기 위해서는 트랜잭션 내에서 작업이 이루어져야하기 때문에 트랜잭션을 사용해야함
    @Query(value = "DELETE FROM Comment c WHERE c.ask_id = :askId", nativeQuery = true)
    void deleteCommentsByAskId(Long askId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Answer a WHERE a.ask_id = :askId", nativeQuery = true)
    void deleteAnswersByAskId(Long askId);

}
