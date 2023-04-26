package com.preproject.stackOverFlowClone.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EMAIL_EXISTS(409, "Member email exists"),
    MEMBER_NAME_EXISTS(409, "Member name exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    
    ASK_NOT_FOUND(404, "Ask not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    MEMBER_NOT_MATCH(404, "Member does not match.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
