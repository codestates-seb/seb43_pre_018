package com.preproject.stackOverFlowClone.comment.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.comment.dto.CommentResponseDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public void saveComment(CommentSaveDto commentSaveDto) {

        boolean validMember = commentRepository.existsByMemberId(commentSaveDto.getMemberId());
        boolean validAsk = commentRepository.existsByAskId(commentSaveDto.getAskId());
        boolean validAnswer = commentRepository.existsByAnswerId(commentSaveDto.getAnswerId());

        if(!validMember || !validAsk || !validAnswer) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }


        Comment comment = Comment.of(commentSaveDto);

        commentRepository.save(comment);
    }

    @Transactional
    public CommentResponseDto updateComment(Long commentId, CommentUpdateDto commentUpdateDto) {

        Comment findComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        findComment.update(commentUpdateDto);

        String memberName = commentRepository.findMemberNameByMemberId(findComment.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));;
        return CommentResponseDto.of(memberName, findComment);
    }

    public void deleteComment(Long commentId) {

        commentRepository.deleteById(commentId);

    }

    public SingleResponseDto<CommentResponseDto> findComment(Long commentId) {

        Comment findComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        String memberName = commentRepository.findMemberNameByMemberId(findComment.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));;
        CommentResponseDto responseDto = CommentResponseDto.of(memberName, findComment);

        return new SingleResponseDto<>(responseDto);

    }

    public MultiResponseDto<CommentResponseDto> findAllComment(Long answerId, int page, int size) {

        Page<Comment> commentPage = commentRepository.findAll(answerId, PageRequest.of(page, size, Sort.by("id").descending()));
        List<Comment> commentList = commentPage.getContent();

        List<CommentResponseDto> responseDtos = commentList.stream()
                .map(comment -> {
                    String memberName = commentRepository.findMemberNameByMemberId(comment.getMemberId())
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));;
                    return CommentResponseDto.of(memberName, comment);
                })
                .collect(Collectors.toList());

        return new MultiResponseDto<>(responseDtos, commentPage);
    }
}