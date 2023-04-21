package com.preproject.stackOverFlowClone.member.dto;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberFindResponseDto {

    private String name;

    private String email;

    public static MemberFindResponseDto of(Member member) {
        MemberFindResponseDto dto = new MemberFindResponseDto();

        dto.setEmail(member.getEmail());
        dto.setName(member.getName());

        return dto;
    }

}
