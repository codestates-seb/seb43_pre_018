package com.preproject.stackOverFlowClone.member.dto;

import lombok.Getter;

@Getter
public class MemberUpdateDto {

    private Long memberId;

    private String name;

    private String email;

    private String password;
}
