package com.preproject.stackOverFlowClone.comment.dto;

import lombok.Getter;

@Getter
public class CommentSaveDto {

    private Long askId;
    private Long answerId;
    private String content;

}
