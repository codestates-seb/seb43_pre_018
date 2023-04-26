package com.preproject.stackOverFlowClone.ask.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class AskDto {

    // post -> save
    @Getter
    @Setter
    @AllArgsConstructor
    public static class SaveDto {

        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    // patch -> update
    @Getter
    @Setter
    @AllArgsConstructor
    public static class UpdateDto {

        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ResponseDto {
        private Long askId;
        private Long memberId;
        private String memberName;
        private String title;
        private String content;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AskDetailAnswerResponseDto {
        private Long answerId;
        private Long askId;
        private Long memberId;
        private String memberName;
        private String content;
        private LocalDateTime createdAt;
        private List<AskDetailCommentResponseDto> commentList;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AskDetailCommentResponseDto {
        private Long commentId;
        private Long askId;
        private Long answerId;
        private Long memberId;
        private String memberName;
        private String content;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AskDetailResponseDto {
        private ResponseDto askResponseDto;
        private List<AskDetailAnswerResponseDto> askDetailAnswerResponseDtoList;
        private List<AskDetailCommentResponseDto> askDetailCommentResponseDtoList;
    }

    //상세페이지 답변 클래스 추가
    @Getter
    @Setter
    @AllArgsConstructor
    public static class AskDetailResponseTemplateDto {
        private ResponseDto askResponseDto;
        private List<AskDetailAnswerResponseDto> answerList;
    }
}
