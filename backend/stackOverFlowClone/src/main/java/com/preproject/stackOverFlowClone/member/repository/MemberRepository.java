package com.preproject.stackOverFlowClone.member.repository;

import com.preproject.stackOverFlowClone.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
}
