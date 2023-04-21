package com.preproject.stackOverFlowClone.member.service;

import com.preproject.stackOverFlowClone.member.dto.*;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberResponseLoginDto loginMember(MemberSaveLoginDto loginDto) {

        Member findMember = memberRepository.findByEmail(loginDto.getEmail());

        if(Objects.equals(findMember.getPassword(), loginDto.getPassword())) {
            return MemberResponseLoginDto.of(findMember);
        }

        else
            throw new IllegalArgumentException("로그인 실패!");
    }

    public MemberResponseSignUpDto saveMember(MemberSaveSignUpDto signUpDto) {

        Member member = Member.of(signUpDto);

        memberRepository.save(member);

        return MemberResponseSignUpDto.of(member);

    }

    @Transactional
    public MemberResponseSignUpDto updateMember(MemberUpdateDto memberUpdateDto) {

        Member findMember = memberRepository.findById(memberUpdateDto.getMemberId()).orElseThrow(IllegalArgumentException::new);

        findMember.update(memberUpdateDto);

        return MemberResponseSignUpDto.of(findMember);

    }

    public void deleteMember(Long memberId) {

        memberRepository.deleteById(memberId);

    }
}
