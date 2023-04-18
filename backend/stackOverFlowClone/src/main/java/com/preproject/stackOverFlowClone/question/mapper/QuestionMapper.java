package com.preproject.stackOverFlowClone.question.mapper;

import com.preproject.stackOverFlowClone.question.dto.QuestionDto;
import com.preproject.stackOverFlowClone.question.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {
    // post -> save
    public Question saveDtoToQuestion(QuestionDto.SaveDto saveDto) {
        Question question = new Question(
                saveDto.getTitle(),
                saveDto.getContent(),
                saveDto.getMember()
        );
        return question;
    }

    // patch -> update
    public Question updateDtoToQuestion(QuestionDto.UpdateDto updateDto) {
        Question question = new Question(
                updateDto.getTitle(),
                updateDto.getContent(),
                updateDto.getMember()
        );
        question.setId(updateDto.getQuestionId());

        return question;
    }

    public QuestionDto.ResponseDto questionToResponseDto(Question question) {
        QuestionDto.ResponseDto responseDto = new QuestionDto.ResponseDto(
                question.getId(),
                question.getMember(),
                question.getTitle(),
                question.getContent(),
                question.getCreatedAt()
        );
        return responseDto;
    }
}
