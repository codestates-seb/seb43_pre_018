package com.preproject.stackOverFlowClone.member.service;

import com.preproject.stackOverFlowClone.auth.utils.CustomAuthorityUtils;
import com.preproject.stackOverFlowClone.auth.utils.GetAuthUserUtils;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.dto.*;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import com.preproject.stackOverFlowClone.utils.UriCreator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;  // Spring Security
    private final CustomAuthorityUtils authorityUtils;  // JWT

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    // 회원 로그인
    public URI loginMember(MemberSaveLoginDto loginDto) {
        // JWT
        Optional<Member> findMember = memberRepository.findByEmail(loginDto.getEmail());
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if(Objects.equals(member.getPassword(), loginDto.getPassword())) {
            String defaultUri = "http://localhost:8080";
            URI location = UriCreator.createUri(defaultUri);
            return location;
        }

        else
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    // 회원 가입 (회원 등록)
    public URI saveMember(MemberSaveSignUpDto signUpDto) {
        // 추가
        if(verifyExistEmail(signUpDto.getEmail()) == true) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EMAIL_EXISTS);
        }
        if(verifyExistName(signUpDto.getName()) == true) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_EXISTS);
        }

        Member member = Member.of(signUpDto);

        // Spring Security
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // JWT
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        memberRepository.save(member);

        String loginUri = "http://localhost:8080/login";

        URI location = UriCreator.createUri(loginUri);

        return location;
    }

    // 회원 정보 수정
    @Transactional
    public MemberResponseSignUpDto updateMember(MemberUpdateDto memberUpdateDto) {
        Member member = getLoginMember();

        member.update(memberUpdateDto);

        return MemberResponseSignUpDto.of(member);
    }

    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
    }

    // 추가
    public void deleteMember() {
        memberRepository.deleteById(getLoginMember().getId());
    }

    public MemberFindResponseDto findMember(Long memberId) {

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberFindResponseDto.of(findMember);
    }

    public MemberFindResponseDto findMember() {
        Member member = getLoginMember();
        return MemberFindResponseDto.of(member);
    }

    // JWT
    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }

    public boolean verifyExistEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if(findMember.isPresent()) {
            return true;
        }
        return false;
    }

    public boolean verifyExistName(String name) {
        Optional<Member> findMember = memberRepository.findByName(name);
        if(findMember.isPresent()) {
            return true;
        }
        return false;
    }
}
