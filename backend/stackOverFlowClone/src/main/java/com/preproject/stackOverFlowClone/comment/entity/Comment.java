package com.preproject.stackOverFlowClone.comment.entity;


import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long answerId;

    @Column(nullable = false)
    private Long questionId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public static Comment of(Long answerId, Long memberId, Long questionId, CommentSaveDto commentSaveDto) {

        Comment comment = new Comment();

        comment.setContent(commentSaveDto.getContent());

        comment.setMemberId(memberId);

        comment.setAnswerId(answerId);

        comment.setQuestionId(questionId);

        return comment;

    }

    public void update(CommentUpdateDto commentUpdateDto) {

        if(commentUpdateDto.getContent() != null) {
            this.setContent(commentUpdateDto.getContent());
        }
    }
}
