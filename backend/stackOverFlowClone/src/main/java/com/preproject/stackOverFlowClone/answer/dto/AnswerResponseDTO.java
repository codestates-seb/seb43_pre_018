package com.preproject.stackOverFlowClone.answer.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class AnswerResponseDTO {
    private long id;
    private long memberId;
    private long askId;
    private String content;
    private LocalDateTime created_at;

}
