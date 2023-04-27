package com.preproject.stackOverFlowClone.member.dto;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberResponseSignUpDto {
    private String name;
    private String email;
    private String password;

    public static MemberResponseSignUpDto of(Member member) {
        MemberResponseSignUpDto dto = new MemberResponseSignUpDto();

        dto.setEmail(member.getEmail());
        dto.setName(member.getName());
        dto.setPassword(member.getPassword());

        return dto;
    }
}
