package com.preproject.stackOverFlowClone.member.controller;


import com.preproject.stackOverFlowClone.member.dto.*;
import com.preproject.stackOverFlowClone.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponseLoginDto> login(@RequestBody MemberSaveLoginDto loginDto) {
        MemberResponseLoginDto response = memberService.loginMember(loginDto);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signUp")
    public ResponseEntity<MemberResponseSignUpDto> signUp(@RequestBody MemberSaveSignUpDto signUpDto) {
        MemberResponseSignUpDto response = memberService.saveMember(signUpDto);

        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<MemberResponseSignUpDto> updateMember(@RequestBody MemberUpdateDto memberUpdateDto) {
        MemberResponseSignUpDto response = memberService.updateMember(memberUpdateDto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable("memberId") Long memberId) {

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }


}
