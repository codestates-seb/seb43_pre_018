package com.preproject.stackOverFlowClone.ask.mapper;

import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AskMapper {
    MemberRepository memberRepository;

    public AskMapper(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // post -> save
    public Ask saveDtoToAsk(AskDto.SaveDto saveDto) {
        Ask ask = new Ask(
                saveDto.getTitle(),
                saveDto.getContent(),
                saveDto.getMemberId()
        );

        return ask;
    }

    public AskDto.ResponseDto askToResponseDto(Ask ask) {
        AskDto.ResponseDto responseDto = new AskDto.ResponseDto(
                ask.getId(),
                ask.getMemberId(),
                ask.getTitle(),
                ask.getContent(),
                ask.getCreatedAt()
        );
        return responseDto;
    }
}
