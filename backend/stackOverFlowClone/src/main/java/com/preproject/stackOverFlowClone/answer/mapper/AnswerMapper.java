package com.preproject.stackOverFlowClone.answer.mapper;


import com.preproject.stackOverFlowClone.answer.dto.AnswerUpdateDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerSaveDTO;
import com.preproject.stackOverFlowClone.answer.dto.AnswerResponseDTO;
import com.preproject.stackOverFlowClone.answer.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerSaveDtoToAnswer(AnswerSaveDTO requestBody);
    Answer answerUpdateDtoToAnswer(AnswerUpdateDTO requestBody);
    AnswerResponseDTO answerToAnswerResponseDto(Answer answer);
    List<AnswerResponseDTO> answersToAnswerResponseDtos(List<Answer> answers);
}
