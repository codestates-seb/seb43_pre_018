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
        // 멤버 존재 여부 확인 필요
        Ask ask = mapper.saveDtoToAsk(saveDto);
        ask = repository.save(ask);
        String uri = "http://localhost:8080/ask/" + ask.getId();
        return uri;
    }

    // patch -> update
    public String updateAsk(Long askId, AskDto.UpdateDto updateDto) {
        Optional<Ask> findAsk = repository.findById(askId);
        // 예외 추가 필요
        //findAsk.orElseThrow();

        Ask updateAsk = findAsk.get();
        updateAsk.setTitle(updateDto.getTitle());
        updateAsk.setContent(updateDto.getContent());

        repository.save(updateAsk);

        String uri = "http://localhost:8080/ask/" + updateAsk.getId();
        return uri;
    }

    public String deleteAsk(Long askId) {
        repository.deleteById(askId);
        String uri = "http://localhost:8080/";
        return uri;
    }
}
