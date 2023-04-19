package com.preproject.stackOverFlowClone.ask.mapper;

import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import org.springframework.stereotype.Component;

@Component
public class AskMapper {
    // post -> save
    public Ask saveDtoToQuestion(AskDto.SaveDto saveDto) {
        Ask ask = new Ask(
                saveDto.getTitle(),
                saveDto.getContent(),
                saveDto.getMember()
        );
        return ask;
    }

    // patch -> update
    public Ask updateDtoToQuestion(AskDto.UpdateDto updateDto) {
        Ask ask = new Ask(
                updateDto.getTitle(),
                updateDto.getContent(),
                updateDto.getMember()
        );
        ask.setId(updateDto.getQuestionId());

        return ask;
    }

    public AskDto.ResponseDto questionToResponseDto(Ask ask) {
        AskDto.ResponseDto responseDto = new AskDto.ResponseDto(
                ask.getId(),
                ask.getMember(),
                ask.getTitle(),
                ask.getContent(),
                ask.getCreatedAt()
        );
        return responseDto;
    }
}
