package com.preproject.stackOverFlowClone.answer.mapper;

import com.preproject.stackOverFlowClone.answer.dto.AnswerResponseDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerSaveDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerUpdateDTO;
import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.repository.AnswerRepository;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import org.springframework.stereotype.Component;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CustomAnswerMapper implements AnswerMapper{
    private final MemberRepository memberRepository;
    // 23.04.25 LJC - updateAnswer 수정
    private final AnswerRepository answerRepository;

    public CustomAnswerMapper(MemberRepository memberRepository, AnswerRepository answerRepository) {
        this.memberRepository = memberRepository;
        this.answerRepository = answerRepository;
    }

//    public CustomAnswerMapper(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }

    @Override
    public Answer answerSaveDtoToAnswer(AnswerSaveDTO requestBody) {
        Answer answer = new Answer();
        answer.setContent(requestBody.getContent());
        answer.setAskId(requestBody.getAskId());
        answer.setMemberId(requestBody.getMemberId());
        answer.setCreatedAt(requestBody.getCreatedAt());

        return answer;
    }

    @Override
    public Answer answerUpdateDtoToAnswer(Long answerId, AnswerUpdateDTO requestBody) {
        // 23.04.25 LJC - updateAnswer 수정
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        findAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND));
        Answer answer = findAnswer.get();

//        Answer answer = new Answer();
//        answer.setContent(requestBody.getContent());
//        answer.setAskId(requestBody.getAskId());
//        answer.setMemberId(requestBody.getMemberId());
//        answer.setCreatedAt(requestBody.getCreatedAt());

        return answer;
    }

    @Override
    public AnswerResponseDTO answerToAnswerResponseDto(Answer answer) {
        Optional<Member> memberOptional = memberRepository.findById(answer.getMemberId());
        Member member = memberOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return AnswerResponseDTO.builder()
                .id(answer.getId())
                .memberId(answer.getMemberId())
                .memberName(member.getName())
                .askId(answer.getAskId())
                .content(answer.getContent())
                .createdAt(answer.getCreatedAt())
                .build();
    }

    @Override
    public List<AnswerResponseDTO> answersToAnswerResponseDtos(List<Answer> answers) {
        List<AnswerResponseDTO> answerResponseDTOs = new ArrayList<>();
        for (Answer answer : answers) {
            Optional<Member> memberOptional = memberRepository.findById(answer.getMemberId());
            Member member = memberOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            AnswerResponseDTO answerResponseDTO = AnswerResponseDTO.builder()
                    .id(answer.getId())
                    .memberId(answer.getMemberId())
                    .memberName(member.getName())
                    .askId(answer.getAskId())
                    .content(answer.getContent())
                    .createdAt(answer.getCreatedAt())
                    .build();

            answerResponseDTOs.add(answerResponseDTO);
        }
        return answerResponseDTOs;
    }
}
