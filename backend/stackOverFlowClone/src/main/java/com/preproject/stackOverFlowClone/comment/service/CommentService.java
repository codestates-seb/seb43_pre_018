package com.preproject.stackOverFlowClone.comment.service;

import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.auth.utils.GetAuthUserUtils;
import com.preproject.stackOverFlowClone.comment.dto.CommentResponseDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import com.preproject.stackOverFlowClone.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final MemberService memberService;

    public CommentService(MemberRepository memberRepository,
                          CommentRepository commentRepository,
                          MemberService memberService) {
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;
        this.memberService = memberService;
    }


    public void saveComment(CommentSaveDto commentSaveDto) {
//        boolean validMember = commentRepository.existsByMemberId(commentSaveDto.getMemberId());
        boolean validAsk = commentRepository.existsByAskId(commentSaveDto.getAskId());
        boolean validAnswer = commentRepository.existsByAnswerId(commentSaveDto.getAnswerId());

        if(!validAsk || !validAnswer) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        else {
            Member member = memberService.getLoginMember();
            Comment comment = Comment.of(commentSaveDto);
            comment.setMemberId(member.getId());

            commentRepository.save(comment);
        }
    }

    @Transactional
    public CommentResponseDto updateComment(Long commentId, CommentUpdateDto commentUpdateDto) {

        Comment findComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        Member loginmember = memberService.getLoginMember();

        if (loginmember.getId().equals(findComment.getMemberId())) {
            findComment.setContent(commentUpdateDto.getContent());
            findComment.setCreatedAt(LocalDateTime.now());

            findComment.update(commentUpdateDto);

            String memberName = commentRepository.findMemberNameByMemberId(findComment.getMemberId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));;
            return CommentResponseDto.of(memberName, findComment);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }

    public void deleteComment(Long commentId) {
        Member loginMember = memberService.getLoginMember();
        Optional<Comment> findComment = Optional.ofNullable(commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND)));
        Comment comment = findComment.get();

        if (loginMember.getId().equals(comment.getMemberId())) {
            commentRepository.deleteById(commentId);
        }
        else{
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
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