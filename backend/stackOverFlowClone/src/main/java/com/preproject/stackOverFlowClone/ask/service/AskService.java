package com.preproject.stackOverFlowClone.ask.service;

import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.repository.AnswerRepository;
import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.ask.mapper.AskMapper;
import com.preproject.stackOverFlowClone.ask.repository.AskRepository;
import com.preproject.stackOverFlowClone.comment.entity.Comment;
import com.preproject.stackOverFlowClone.comment.repository.CommentRepository;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.PageInfo;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import com.preproject.stackOverFlowClone.exception.BusinessLogicException;
import com.preproject.stackOverFlowClone.exception.ExceptionCode;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AskService {
    AskMapper mapper;
    MemberRepository memberRepository;
    AskRepository askRepository;
    AnswerRepository answerRepository;
    CommentRepository commentRepository;

    public AskService(AskMapper mapper, MemberRepository memberRepository, AskRepository askRepository, AnswerRepository answerRepository, CommentRepository commentRepository) {
        this.mapper = mapper;
        this.memberRepository = memberRepository;
        this.askRepository = askRepository;
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
    }

    // 질문 상세 내용 조회
//    public AskDto.AskDetailResponseDto getAskDetail(Long askId) {
//        // 질문 존재 여부 확인
//        Optional<Ask> findAsk = askRepository.findById(askId);
//        findAsk.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND));
//
//        Ask ask = findAsk.get();
//        AskDto.ResponseDto responseDto = mapper.askToResponseDto(ask);
//
//        List<Answer> answerList = answerRepository.findAnswersByAskId(askId);
//        List<AskDto.AskDetailAnswerResponseDto> askDetailAnswerResponseDtoList = mapper.answerListToAskDetailAnswerResponseDtoList(answerList);
//
//        List<Comment> commentList = commentRepository.findCommentsByAskId(askId);
//        List<AskDto.AskDetailCommentResponseDto> askDetailCommentResponseDtoList = mapper.commentListToAskDetailCommentResponseDtoList(commentList);
//
//        AskDto.AskDetailResponseDto askDetailResponseDto = new AskDto.AskDetailResponseDto(responseDto, askDetailAnswerResponseDtoList, askDetailCommentResponseDtoList);
//        return askDetailResponseDto;
//    }

    // 질문 상세 내용 조회 (최재영 버전 )
    public MultiResponseDto getAskDetail(Long askId, int page, int size) {
        // 질문 존재 여부 확인
        Optional<Ask> findAsk = askRepository.findById(askId);
        findAsk.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND));

        Ask ask = findAsk.get();
        AskDto.ResponseDto responseDto = mapper.askToResponseDto(ask);

        List<Answer> answerList = answerRepository.findAnswersByAskId(askId);
        List<AskDto.AskDetailAnswerResponseDto> askDetailAnswerResponseDtoList = mapper.answerListToAskDetailAnswerResponseDtoList(answerList);

        int totalPage = (askDetailAnswerResponseDtoList.size() + 1) / size;

        if (totalPage == 0) {
            totalPage = 1;
        }
        PageInfo pageInfo = new PageInfo(page + 1, size, askDetailAnswerResponseDtoList.size() + 1, totalPage);

        AskDto.AskDetailResponseTemplateDto templateDto = new AskDto.AskDetailResponseTemplateDto(responseDto, askDetailAnswerResponseDtoList);

        List finalResponseDto = List.of(templateDto.getAskResponseDto(), templateDto.getAnswerList());
        MultiResponseDto multiResponseDto = new MultiResponseDto<>(finalResponseDto, pageInfo);
        return multiResponseDto;
    }

    // 질문 리스트 조회
    public MultiResponseDto getAskList(int page, int size) {
        Page<Ask> askPage = askRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        List<Ask> askList = askPage.getContent();

        List<AskDto.ResponseDto> responseDtoList = mapper.askListToReponseDtoList(askList);
        MultiResponseDto multiResponseDto = new MultiResponseDto(responseDtoList, askPage);
        return multiResponseDto;
    }

    // 질문 검색
    public MultiResponseDto getSearchAskList(String searchWord, int page, int size) {
        Page<Ask> askPage = askRepository.findSearchAskList(searchWord, PageRequest.of(page, size, Sort.by("id").descending()));
        List<Ask> askList = askPage.getContent();

        List<AskDto.ResponseDto> responseDtoList = mapper.askListToReponseDtoList(askList);

        MultiResponseDto multiResponseDto = new MultiResponseDto<>(responseDtoList, askPage);
        return multiResponseDto;
    }

    // post -> save
    // 질문 등록
    public String saveAsk(AskDto.SaveDto saveDto) {
        // 멤버 존재 여부 확인
        Optional<Member> findMember = memberRepository.findById(saveDto.getMemberId());
        findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Ask ask = mapper.saveDtoToAsk(saveDto);
        ask = askRepository.save(ask);
        String uri = "http://localhost:8080/ask/" + ask.getId();
        return uri;
    }

    // patch -> update
    // 질문 수정
    public String updateAsk(Long askId, AskDto.UpdateDto updateDto) {
        // 질문 존재 여부 확인
        Optional<Ask> findAsk = askRepository.findById(askId);
        findAsk.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND));

        Ask updateAsk = findAsk.get();
        updateAsk.setTitle(updateDto.getTitle());
        updateAsk.setContent(updateDto.getContent());

        askRepository.save(updateAsk);

        String uri = "http://localhost:8080/ask/" + updateAsk.getId();
        return uri;
    }

    // 질문 삭제
    public String deleteAsk(Long askId) {

        askRepository.deleteAnswersByAskId(askId);
        askRepository.deleteCommentsByAskId(askId);

        askRepository.deleteById(askId);
        String uri = "http://localhost:8080/";
        return uri;
    }

    public SingleResponseDto getFindAsk(Long askId) {

        Optional<Ask> findAsk = askRepository.findById(askId);
        findAsk.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ASK_NOT_FOUND));

        Ask ask = findAsk.get();
        AskDto.ResponseDto responseDto = mapper.askToResponseDto(ask);

        return new SingleResponseDto(responseDto);
    }
}
