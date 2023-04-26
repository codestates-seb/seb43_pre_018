package com.preproject.stackOverFlowClone.answer.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.repository.AnswerRepository;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.auth.utils.GetAuthUserUtils;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import com.preproject.stackOverFlowClone.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class AnswerService {
    public final MemberRepository memberRepository;
    public final AnswerRepository answerRepository;
    public final CommentRepository commentRepository;
    public final MemberService memberService;

    public Answer saveAnswer(Answer answer){
        boolean existsByAskId =
                answerRepository.existsByAskId(answer.getAskId());

        if (!existsByAskId) throw new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND);
        else {
            Member member = memberService.getLoginMember();
            answer.setMemberId(member.getId());

            return answerRepository.save(answer);
        }
    }

    public Answer updateAnswer(Answer answer, String content){
        // 23.04.25 LJC - updateAnswer 수정
//        Answer findAnswer = findVerifiedAnswer(answer.getId());

//        Optional.ofNullable(answer.getContent())
//                .ifPresent(content -> findAnswer.setContent(content));

        // 23.04.26 KSH - JWT 관련 수정 - answer 존재여부 검증 및 멤버 일치여부 검증
        answer = answerRepository.findById(answer.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        Member loginMember = memberService.getLoginMember();

        if (loginMember.getId().equals(answer.getMemberId())) {
            answer.setContent(content);
            answer.setCreatedAt(LocalDateTime.now());

            return answerRepository.save(answer);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }

    @Transactional(readOnly = true)
    public Answer findAnswer(long id){

        return findVerifiedAnswer(id);
    }

    public Page<Answer> findAnswers(Long askId, int page, int size){

        return answerRepository.findAllByAskId(askId, PageRequest.of(page, size,
                Sort.by("id").descending()));
    }

    public void deleteAnswer(long id){
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        Member loginMember = memberService.getLoginMember();

        if (loginMember.getId().equals(answer.getMemberId())) {
        Answer findAnswer = findVerifiedAnswer(id);

        // Answer에 연관된 모든 Comment를 삭제
        List<Comment> comments = commentRepository.findAllByAnswerId(id);
        commentRepository.deleteAll(comments);

        answerRepository.delete(findAnswer);
        }
        else{
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }
    }

    @Transactional(readOnly = true)
    public Answer findVerifiedAnswer(long id){
        Optional<Answer> optionalMember =
                answerRepository.findById(id);
        Answer findAnswer =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
