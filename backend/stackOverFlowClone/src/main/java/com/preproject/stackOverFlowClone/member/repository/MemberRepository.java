package com.preproject.stackOverFlowClone.member.repository;

import com.preproject.stackOverFlowClone.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}
