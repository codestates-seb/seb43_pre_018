package com.preproject.stackOverFlowClone.answer.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.repository.AnswerRepository;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class AnswerService {
    public final AnswerRepository answerRepository;

    public Answer createAnswer(Answer answer){
        boolean existsByMemberId =
                answerRepository.existsByMemberId(answer.getMemberId());
        boolean existsByAskId =
                answerRepository.existsByAskId(answer.getAskId());

        if (!existsByMemberId) throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        else if (!existsByAskId) throw new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND);
        else {
            Answer savedAnswer = answerRepository.save(answer);

            return savedAnswer;
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
