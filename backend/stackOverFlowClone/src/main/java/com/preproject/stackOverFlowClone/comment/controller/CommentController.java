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

    @PatchMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable("commentId") Long commentId,
                                              @RequestBody CommentUpdateDto commentUpdateDto) {
        CommentResponseDto response = commentService.updateComment(commentId, commentUpdateDto);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {
        commentService.deleteComment(commentId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<SingleResponseDto<CommentResponseDto>> findComment(@PathVariable("commentId") Long commentId) {
        SingleResponseDto<CommentResponseDto> response = commentService.findComment(commentId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{answer-id}/findAll")
    public ResponseEntity<MultiResponseDto<CommentResponseDto>> findAllComment(@PathVariable("answer-id") Long answerId,
                                                                               @Positive @RequestParam int page,
                                                                               @Positive @RequestParam int size ) {
        MultiResponseDto<CommentResponseDto> response = commentService.findAllComment(answerId, page-1, size);

        return ResponseEntity.ok(response);
    }
}
