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
    private Long commentId;
    private String content;
    private String memberName;

    public static CommentResponseDto of(String memberName, Comment comment) {
        CommentResponseDto dto = new CommentResponseDto();

        dto.setCommentId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setMemberName(memberName);

        return dto;
    }
}
