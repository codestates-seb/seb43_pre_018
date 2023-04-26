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

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long answerId;

    @Column(nullable = false)
    private Long askId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public static Comment of(CommentSaveDto commentSaveDto) {

        Comment comment = new Comment();

        comment.setContent(commentSaveDto.getContent());

//        comment.setMemberId(commentSaveDto.getMemberId());

        comment.setAnswerId(commentSaveDto.getAnswerId());

        comment.setAskId(commentSaveDto.getAskId());

        return comment;

    }

    public void update(CommentUpdateDto commentUpdateDto) {

        if(commentUpdateDto.getContent() != null) {
            this.setContent(commentUpdateDto.getContent());
        }
    }
}
