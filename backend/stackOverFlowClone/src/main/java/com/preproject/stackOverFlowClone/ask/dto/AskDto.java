package com.preproject.stackOverFlowClone.ask.dto;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class AskDto {
    // post -> save
    @Getter
    @AllArgsConstructor
    public class SaveDto {
        private Member member;
        private String title;
        private String content;
    }

    // patch -> update
    @Getter
    @AllArgsConstructor
    public class UpdateDto {
        private Long questionId;
        private Member member;
        private String title;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    static public class ResponseDto {
        private Long questionId;
        private Member member;
        private String title;
        private String content;
        private LocalDateTime createdAt;
    }

}
