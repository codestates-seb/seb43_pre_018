package com.preproject.stackOverFlowClone.comment.controller;

import com.preproject.stackOverFlowClone.comment.dto.CommentResponseDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import com.preproject.stackOverFlowClone.comment.service.CommentService;
import com.preproject.stackOverFlowClone.dto.MultiResponseDto;
import com.preproject.stackOverFlowClone.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import javax.websocket.server.PathParam;
import java.net.URI;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Void> saveComment(@RequestBody CommentSaveDto commentSaveDto) {

        commentService.saveComment(commentSaveDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<CommentResponseDto> updateComment(@RequestBody CommentUpdateDto commentUpdateDto) {

        CommentResponseDto response = commentService.updateComment(commentUpdateDto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {

        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<SingleResponseDto<CommentResponseDto>> findComment(@PathVariable("commentId") Long commentId) {

        SingleResponseDto<CommentResponseDto> response = commentService.findComment(commentId);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> findAllComment(@Positive @RequestParam int page,
                                                                               @Positive @RequestParam int size) {

        MultiResponseDto<CommentResponseDto> response = commentService.findAllComment(page-1, size);

        return ResponseEntity.ok(response);
    }
}
