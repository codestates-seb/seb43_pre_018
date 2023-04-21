package com.preproject.stackOverFlowClone.ask.repository;

import com.preproject.stackOverFlowClone.ask.entity.Ask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AskRepository extends JpaRepository<Ask, Long> {
    @Query("SELECT a FROM Ask a WHERE a.title LIKE :searchWord")
    List<Ask> findSearchAskList(String searchWord);

}
