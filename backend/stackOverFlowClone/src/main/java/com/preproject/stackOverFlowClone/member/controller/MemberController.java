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

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody MemberSaveLoginDto loginDto) {

        URI location = memberService.loginMember(loginDto);

        return ResponseEntity.ok().location(location).build();
    }

    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@Valid @RequestBody MemberSaveSignUpDto signUpDto) {

        URI location = memberService.saveMember(signUpDto);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity<MemberResponseSignUpDto> updateMember(@RequestBody MemberUpdateDto memberUpdateDto) {
        MemberResponseSignUpDto response = memberService.updateMember(memberUpdateDto);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<MemberFindResponseDto> findMember(@PathVariable("memberId") Long memberId) {

        MemberFindResponseDto response = memberService.findMember(memberId);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable("memberId") Long memberId) {

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
