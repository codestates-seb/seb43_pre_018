package com.preproject.stackOverFlowClone.member.controller;


import com.preproject.stackOverFlowClone.member.dto.*;
import com.preproject.stackOverFlowClone.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입
    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@Valid @RequestBody MemberSaveSignUpDto signUpDto) {

        URI location = memberService.saveMember(signUpDto);

        return ResponseEntity.created(location).build();
    }

    // 회원 정보 수정
    @PatchMapping("/member")
    public ResponseEntity<Void> updateMember(@RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.updateMember(memberUpdateDto);

        return ResponseEntity.ok().build();
    }

    // 추후 admin ROLE 추가시 사용 예정
    @GetMapping("/member/{memberId}")
    public ResponseEntity<MemberFindResponseDto> findMember(@PathVariable("memberId") Long memberId) {
        MemberFindResponseDto response = memberService.findMember(memberId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/member")
    public ResponseEntity<MemberFindResponseDto> findMember() {
        MemberFindResponseDto response = memberService.findMember();
        return ResponseEntity.ok(response);
    }

    // 추후 admin ROLE 추가시 사용 예정
    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable("memberId") Long memberId) {
        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/member")
    public ResponseEntity<Void> deleteMember() {
        memberService.deleteMember();
        return ResponseEntity.noContent().build();
    }
}
