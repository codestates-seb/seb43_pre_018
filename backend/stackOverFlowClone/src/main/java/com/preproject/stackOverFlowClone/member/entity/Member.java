package com.preproject.stackOverFlowClone.member.entity;

import com.preproject.stackOverFlowClone.member.dto.MemberSaveSignUpDto;
import com.preproject.stackOverFlowClone.member.dto.MemberUpdateDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    public static Member of(MemberSaveSignUpDto signUpDto) {

        Member member = new Member();

        member.setName(signUpDto.getName());

        member.setEmail(signUpDto.getEmail());

        member.setPassword(signUpDto.getPassword());

        return member;
    }

    public void update(MemberUpdateDto memberUpdateDto) {
        if(memberUpdateDto.getName() != null) {
            this.name = memberUpdateDto.getName();
        }

        if(memberUpdateDto.getEmail() != null) {
            this.email = memberUpdateDto.getEmail();
        }

        if(memberUpdateDto.getPassword() != null) {
            this.password = memberUpdateDto.getPassword();
        }
    }
}
