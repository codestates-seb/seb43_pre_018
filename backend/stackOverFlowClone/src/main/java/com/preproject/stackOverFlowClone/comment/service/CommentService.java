package com.preproject.stackOverFlowClone.comment.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.comment.dto.CommentResponseDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public CommentResponseDto saveComment(Long answerId, CommentSaveDto commentSaveDto) {

        Answer findAnswer = commentRepository.findByAnswerId(answerId);

        Comment comment = Comment.of(findAnswer.getId(), findAnswer.getMemberId(), findAnswer.getAskId(), commentSaveDto);

        return CommentResponseDto.of(comment);

    }

    @Transactional
    public CommentResponseDto updateComment(CommentUpdateDto commentUpdateDto) {

        Comment findComment = commentRepository.findById(commentUpdateDto.getCommentId()).orElseThrow(IllegalArgumentException::new);

        findComment.update(commentUpdateDto);

        return CommentResponseDto.of(findComment);
    }

    public void deleteComment(Long commentId) {

        commentRepository.deleteById(commentId);

    }
}