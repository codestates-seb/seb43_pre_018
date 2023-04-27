package com.preproject.stackOverFlowClone.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberSaveSignUpDto {

    @NotBlank()
    @Pattern(regexp = "^[가-힣]+(\\s?[가-힣]+)*$", message = "한글로만 작성해야 합니다(외국명도 마찬가지로 한글발음으로 작성해야 합니다)")
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@#$%!&*^])[A-Za-z\\d@#$%!&*^]{8,20}$", message = "영문, 숫자, 특수문자(@,#,$,%,!,&,*,^)가 사용되어야합니다.(8~20글자)")
    private String password;
}
