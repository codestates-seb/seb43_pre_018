package com.preproject.stackOverFlowClone.member.dto;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberResponseLoginDto {
    private String email;
    private String password;

    public static MemberResponseLoginDto of(Member findMember) {
        MemberResponseLoginDto dto = new MemberResponseLoginDto();

        dto.setEmail(findMember.getEmail());
        dto.setPassword(findMember.getPassword());

        return dto;
    }
}
