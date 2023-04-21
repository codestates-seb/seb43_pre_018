package com.preproject.stackOverFlowClone.comment.dto;

import com.preproject.stackOverFlowClone.comment.entity.Comment;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentResponseDto {
    private String content;

    public static CommentResponseDto of(Comment comment) {

        CommentResponseDto dto = new CommentResponseDto();

        dto.setContent(comment.getContent());

        return dto;

    }
}
