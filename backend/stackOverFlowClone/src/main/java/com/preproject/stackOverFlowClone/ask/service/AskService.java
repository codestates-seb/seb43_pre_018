package com.preproject.stackOverFlowClone.ask.service;

import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import com.preproject.stackOverFlowClone.ask.mapper.AskMapper;
import com.preproject.stackOverFlowClone.ask.repository.AskRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AskService {
    AskMapper mapper;
    AskRepository repository;

    public AskService(AskMapper mapper, AskRepository repository) {
        this.mapper = mapper;
        this.repository = repository;
    }

    // post -> save
    public String saveAsk(AskDto.SaveDto saveDto) {
        Ask ask = mapper.saveDtoToQuestion(saveDto);
        ask = repository.save(ask);

        String uri = "http://localhost:8080/ask/" + ask.getId();
        return uri;
    }

    // patch -> update
    public String updateAsk(AskDto.UpdateDto updateDto) {
        Ask ask = mapper.updateDtoToQuestion(updateDto);
        ask = repository.save(ask);

        String uri = "http://localhost:8080/ask/" + ask.getId();
        return uri;
    }

    public String deleteAsk(Long askId) {
        Optional<Ask> ask = repository.findById(askId);
        if(ask.isPresent() == false) {
            // 예외처리 추가 필요
        }

        repository.delete(ask.get());
        String uri = "http://localhost:8080/";
        return uri;
    }
}
