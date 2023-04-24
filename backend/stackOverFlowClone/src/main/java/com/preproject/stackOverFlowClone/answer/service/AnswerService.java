package com.preproject.stackOverFlowClone.answer.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.repository.AnswerRepository;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class AnswerService {
    public final AnswerRepository answerRepository;
    public final CommentRepository commentRepository;

    public Answer createAnswer(Answer answer){
        boolean existsByMemberId =
                answerRepository.existsByMemberId(answer.getMemberId());
        boolean existsByAskId =
                answerRepository.existsByAskId(answer.getAskId());

        if (!existsByMemberId) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        else if (!existsByAskId) throw new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND);
        else {
            return answerRepository.save(answer);
        }
    }

    public Answer updateAnswer(Answer answer){
        Answer findAnswer = findVerifiedAnswer(answer.getId());

        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        return answerRepository.save(answer);
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
        Answer findAnswer = findVerifiedAnswer(id);

        // Answer에 연관된 모든 Comment를 삭제
        List<Comment> comments = commentRepository.findAllByAnswerId(id);
        commentRepository.deleteAll(comments);

        answerRepository.delete(findAnswer);
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
