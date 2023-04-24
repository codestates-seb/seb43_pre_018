package com.preproject.stackOverFlowClone.answer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class AnswerResponseDTO {
    private long id;
    private long askId;
    private long memberId;
    private String memberName;
    private String content;
    private LocalDateTime createdAt;

}
