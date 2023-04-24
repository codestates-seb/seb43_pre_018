package com.preproject.stackOverFlowClone.member.service;

import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.dto.*;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import com.preproject.stackOverFlowClone.utils.UriCreator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.Objects;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public URI loginMember(MemberSaveLoginDto loginDto) {

        Member findMember = memberRepository.findByEmail(loginDto.getEmail());

        if(Objects.equals(findMember.getPassword(), loginDto.getPassword())) {
            String defaultUri = "http://localhost:8080";
            URI location = UriCreator.createUri(defaultUri);
            return location;
        }

        else
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public URI saveMember(MemberSaveSignUpDto signUpDto) {

        Member member = Member.of(signUpDto);

        memberRepository.save(member);

        String loginUri = "http://localhost:8080/login";

        URI location = UriCreator.createUri(loginUri);

        return location;

    }

    @Transactional
    public MemberResponseSignUpDto updateMember(Long memberId, MemberUpdateDto memberUpdateDto) {

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        findMember.update(memberUpdateDto);

        return MemberResponseSignUpDto.of(findMember);

    }

    public void deleteMember(Long memberId) {

        memberRepository.deleteById(memberId);

    }

    public MemberFindResponseDto findMember(Long memberId) {

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberFindResponseDto.of(findMember);

    }
}
