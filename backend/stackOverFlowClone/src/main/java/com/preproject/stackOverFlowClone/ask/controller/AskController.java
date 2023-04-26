package com.preproject.stackOverFlowClone.ask.controller;

import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.service.AskService;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import com.preproject.stackOverFlowClone.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class AskController {
    AskService service;
    UriCreator uriCreator;

    public AskController(AskService service, UriCreator uriCreator) {
        this.service = service;
        this.uriCreator = uriCreator;
    }

    // 특정 질문에 대한 상세 페이지 조회
    @GetMapping("/ask/{ask-id}")
    public ResponseEntity getAskDetail(@PathVariable("ask-id") Long askId,
                                       @RequestParam int page,
                                       @RequestParam int size) {
        MultiResponseDto multiResponseDto = service.getAskDetail(askId, page-1, size);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    // 메인 페이지 기본 질문 목록 조회
    // 메인 페이지에서 요청이 온 경우 page = 1, size = 10 고정
    @GetMapping("/")
    public ResponseEntity getMainDefaultAskList() {
        MultiResponseDto multiResponseDto = service.getAskList(0, 10); //페이지번호 0부터 시작이여서 0으로 수정
        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    // 질문 목록 조회
    @GetMapping("/ask")
    public ResponseEntity getAskList(@RequestParam int page, @RequestParam int size) {
        MultiResponseDto multiResponseDto = service.getAskList(page-1, size); //페이지번호 0부터 시작이여서 -1 함
        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    // 질문 검색
    @GetMapping("/search")
    public ResponseEntity getSearchAskList(@RequestParam String searchWord,
                                           @RequestParam int page,
                                           @RequestParam int size) {
        MultiResponseDto multiResponseDto = service.getSearchAskList(searchWord, page-1, size);
        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    // 특정 질문 조회
    @GetMapping("/ask/find/{askId}")
    public ResponseEntity getFindAsk(@PathVariable("askId") Long askId) {

        SingleResponseDto singleResponseDto = service.getFindAsk(askId);

        return ResponseEntity.ok(singleResponseDto);

    }

    // 질문 등록
    @PostMapping("/ask")
    public ResponseEntity saveAsk(@RequestBody AskDto.SaveDto saveDto) {
        String uri = service.saveAsk(saveDto);
        URI location = uriCreator.createUri(uri);
        return ResponseEntity.created(location).build();
    }

    // 질문 수정
    @PatchMapping("/ask/{ask-id}")
    public ResponseEntity updateAsk(@PathVariable("ask-id") Long askId,
                                    @RequestBody AskDto.UpdateDto updateDto) {
        String uri = service.updateAsk(askId, updateDto);
        URI location = uriCreator.createUri(uri);
        return ResponseEntity.status(HttpStatus.OK).location(location).build();
    }

    // 질문 삭제
    @DeleteMapping("/ask/{ask-id}")
    public ResponseEntity deleteAsk(@PathVariable("ask-id") Long askId) {
        String uri = service.deleteAsk(askId);
        URI location = uriCreator.createUri(uri);
        return ResponseEntity.status(HttpStatus.OK).location(location).build();
    }
}
