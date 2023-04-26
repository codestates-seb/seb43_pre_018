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

    // Spring Security
    private final PasswordEncoder passwordEncoder;

    // JWT
    private final CustomAuthorityUtils authorityUtils;

//    public MemberService(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public URI loginMember(MemberSaveLoginDto loginDto) {
        // JWT
        Optional<Member> findMember = memberRepository.findByEmail(loginDto.getEmail());
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//        if(Objects.equals(findMember.getPassword(), loginDto.getPassword())) {
        if(Objects.equals(member.getPassword(), loginDto.getPassword())) {
            String defaultUri = "http://localhost:8080";
            URI location = UriCreator.createUri(defaultUri);
            return location;
        }

        else
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public URI saveMember(MemberSaveSignUpDto signUpDto) {

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

    // JWT
    public Member getLoginMember() {
        Optional<Member> findMember = memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();
        return member;
    }
}
