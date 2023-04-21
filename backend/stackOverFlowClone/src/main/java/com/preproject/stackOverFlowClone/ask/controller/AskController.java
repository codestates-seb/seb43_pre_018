package com.preproject.stackOverFlowClone.ask.controller;

import com.preproject.stackOverFlowClone.ask.dto.AskDto;
import com.preproject.stackOverFlowClone.ask.service.AskService;
import com.preproject.stackOverFlowClone.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class AskController {
    AskService askService;
    UriCreator uriCreator;

    public AskController(AskService askService, UriCreator uriCreator) {
        this.askService = askService;
        this.uriCreator = uriCreator;
    }

    // post -> save
    @PostMapping("/ask")
    public ResponseEntity saveAsk(@RequestBody AskDto.SaveDto saveDto) {
        String uri = askService.saveAsk(saveDto);

        URI location = uriCreator.createUri(uri);

        return ResponseEntity.created(location).build();
    }

    // patch -> update
    @PatchMapping("/ask/{ask-id}")
    public ResponseEntity updateAsk(@PathVariable("ask-id") Long askId,
                                    @RequestBody AskDto.UpdateDto updateDto) {
        String uri = askService.updateAsk(askId, updateDto);

        URI location = uriCreator.createUri(uri);

        return ResponseEntity.status(HttpStatus.OK).location(location).build();
    }

    @DeleteMapping("/ask/{ask-id}")
    public ResponseEntity deleteAsk(@PathVariable("ask-id") Long askId) {
        String uri = askService.deleteAsk(askId);

        URI location = uriCreator.createUri(uri);

        return ResponseEntity.status(HttpStatus.OK).location(location).build();
    }
}
