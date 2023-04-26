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

    // JWT
//    @PostMapping("/login")
//    public ResponseEntity<Void> login(@RequestBody MemberSaveLoginDto loginDto) {
//
//        URI location = memberService.loginMember(loginDto);
//
//        return ResponseEntity.ok().location(location).build();
//    }

    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@Valid @RequestBody MemberSaveSignUpDto signUpDto) {

        URI location = memberService.saveMember(signUpDto);

        return ResponseEntity.created(location).build();
    }

//    @PatchMapping("/member/{memberId}")
//    public ResponseEntity<Void> updateMember(@PathVariable("memberId") Long memberId,
//                                                                @RequestBody MemberUpdateDto memberUpdateDto) {
//        MemberResponseSignUpDto response = memberService.updateMember(memberId, memberUpdateDto);
//
//        return ResponseEntity.ok().build();
//    }

    // 수정
    @PatchMapping("/member")
    public ResponseEntity<Void> updateMember(@RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.updateMember(memberUpdateDto);

        return ResponseEntity.ok().build();
    }

    // 추후 관리자 넣었을때 쓸 수 있으므로 일단은 살려둔다.
    @GetMapping("/member/{memberId}")
    public ResponseEntity<MemberFindResponseDto> findMember(@PathVariable("memberId") Long memberId) {

        MemberFindResponseDto response = memberService.findMember(memberId);

        return ResponseEntity.ok(response);
    }

    // 추가
    @GetMapping("/member")
    public ResponseEntity<MemberFindResponseDto> findMember() {
        MemberFindResponseDto response = memberService.findMember();
        return ResponseEntity.ok(response);
    }

    // 추후 관리자 넣었을때 쓸 수 있으므로 일단은 살려둔다.
    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable("memberId") Long memberId) {

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }

    // 추가
    @DeleteMapping("/member")
    public ResponseEntity<Void> deleteMember() {
        memberService.deleteMember();
        return ResponseEntity.noContent().build();
    }
}
