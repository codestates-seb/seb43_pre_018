package com.preproject.stackOverFlowClone.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerUpdateDTO {

    @NotBlank(message = "답변 내용은 공백이 아니어야 합니다.")
    private String content;
}
