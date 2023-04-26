package com.preproject.stackOverFlowClone.answer.controller;

import com.preproject.stackOverFlowClone.answer.dto.AnswerResponseDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerUpdateDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerSaveDTO;
import com.preproject.stackOverFlowClone.answer.entity.Answer;
import com.preproject.stackOverFlowClone.answer.mapper.AnswerMapper;
import com.preproject.stackOverFlowClone.answer.mapper.CustomAnswerMapper;
import com.preproject.stackOverFlowClone.answer.service.AnswerService;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import com.preproject.stackOverFlowClone.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/answer")
@Validated
@Slf4j
public class AnswerController {
    private final AnswerService answerService;
    private final CustomAnswerMapper mapper;

    public AnswerController(AnswerService answerService, CustomAnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity saveAnswer(@Valid @RequestBody AnswerSaveDTO answerSaveDTO){
        Answer answer = mapper.answerSaveDtoToAnswer(answerSaveDTO);
        Answer createdAnswer = answerService.saveAnswer(answer);
        AnswerResponseDTO answerResponseDTO = mapper.answerToAnswerResponseDto(createdAnswer);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 23.04.25 LJC - updateAnswer 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity updateAnswer(@PathVariable("answer-id") @Positive long id,
                                       @Valid @RequestBody AnswerUpdateDTO answerUpdateDTO){
//        answerUpdateDTO.setId(id);
//        Answer answer = answerService.updateAnswer(mapper.answerUpdateDtoToAnswer(answerUpdateDTO));
        Answer answer = answerService.updateAnswer(mapper.answerUpdateDtoToAnswer(id, answerUpdateDTO), answerUpdateDTO.getContent());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") long id){
        Answer answer = answerService.findAnswer(id);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponseDto(answer)),
                HttpStatus.OK);
    }

    @GetMapping("/{ask-id}/findAll")
    public ResponseEntity getAnswers(@PathVariable("ask-id") Long askId,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(askId, page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.answersToAnswerResponseDtos(answers),
                        pageAnswers),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long id) {
        answerService.deleteAnswer(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
