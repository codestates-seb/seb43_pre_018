package com.preproject.stackOverFlowClone.ask.mapper;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Component
public class AskMapper {
    MemberRepository memberRepository;

    public AskMapper(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // post -> save
    // saveDto -> Ask
    public Ask saveDtoToAsk(AskDto.SaveDto saveDto) {
        Ask ask = new Ask(
                saveDto.getTitle(),
                saveDto.getContent(),
                saveDto.getMemberId()
        );

        return ask;
    }

    // ask -> ResponseDto
    public AskDto.ResponseDto askToResponseDto(Ask ask) {
        // 멤버 존재 여부 확인
        Optional<Member> findMember = memberRepository.findById(ask.getMemberId());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Member member = findMember.get();

        AskDto.ResponseDto responseDto = new AskDto.ResponseDto(
                ask.getId(),
                ask.getMemberId(),
                member.getName(),
                ask.getTitle(),
                ask.getContent(),
                ask.getCreatedAt()
        );
        return responseDto;
    }

    // askList -> ResponseDtoList
    public List<AskDto.ResponseDto> askListToReponseDtoList(List<Ask> askList) {
        List<AskDto.ResponseDto> responseDtoList = new LinkedList<>();
        for (int i = 0; i < askList.size(); i++) {
            AskDto.ResponseDto responseDto = askToResponseDto(askList.get(i));
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

    // answerList -> AskDetailAnswerResponseDto
    public List<AskDto.AskDetailAnswerResponseDto> answerListToAskDetailAnswerResponseDtoList(List<Answer> answerList) {
        List<AskDto.AskDetailAnswerResponseDto> askDetailAnswerResponseDtoList = new LinkedList<>();
        for (int i = 0; i < answerList.size(); i++) {
            Answer answer = answerList.get(i);
            Optional<Member> findMember = memberRepository.findById(answer.getMemberId());
            findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            Member member = findMember.get();

            AskDto.AskDetailAnswerResponseDto askDetailAnswerResponseDto = new AskDto.AskDetailAnswerResponseDto(
                    answer.getId(), answer.getAskId(), answer.getMemberId(), member.getName(), answer.getContent(), answer.getCreatedAt()
            );
            askDetailAnswerResponseDtoList.add(askDetailAnswerResponseDto);
        }
        return askDetailAnswerResponseDtoList;
    }


    // commentList -> AskDetailCommentResponseDto
    public List<AskDto.AskDetailCommentResponseDto> commentListToAskDetailCommentResponseDtoList(List<Comment> commentList) {
        List<AskDto.AskDetailCommentResponseDto> askDetailCommentResponseDtoList = new LinkedList<>();
        for (int i = 0; i < commentList.size(); i++) {
            Comment comment = commentList.get(i);
            Optional<Member> findMember = memberRepository.findById(comment.getMemberId());
            findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            Member member = findMember.get();

            AskDto.AskDetailCommentResponseDto askDetailCommentResponseDto = new AskDto.AskDetailCommentResponseDto(
                    comment.getId(), comment.getAskId(), comment.getAnswerId(), comment.getMemberId(), member.getName(), comment.getContent(), comment.getCreatedAt()
            );
            askDetailCommentResponseDtoList.add(askDetailCommentResponseDto);
        }
        return askDetailCommentResponseDtoList;
    }
}
