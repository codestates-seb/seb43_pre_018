package com.preproject.stackOverFlowClone.ask.dto;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class AskDto {
    // post -> save
    @Getter
    @Setter
    @AllArgsConstructor
    public static class SaveDto {
        private Long memberId;
        private String title;
        private String content;
    }

    // patch -> update
    @Getter
    @Setter
    @AllArgsConstructor
    public static class UpdateDto {
        private Long memberId;
        private String title;
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ResponseDto {
        private Long askId;
        private Long memberId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
    }

}
