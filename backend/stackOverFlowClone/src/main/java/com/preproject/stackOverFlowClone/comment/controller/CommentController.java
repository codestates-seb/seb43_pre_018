package com.preproject.stackOverFlowClone.comment.controller;

import com.preproject.stackOverFlowClone.comment.dto.CommentResponseDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentSaveDto;
import com.preproject.stackOverFlowClone.comment.dto.CommentUpdateDto;
import com.preproject.stackOverFlowClone.comment.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comment/{answerId}")
    public ResponseEntity<CommentResponseDto> saveComment(@PathVariable("answerId") Long answerId,
                                                          @RequestBody CommentSaveDto commentSaveDto) {

        CommentResponseDto response = commentService.saveComment(answerId, commentSaveDto);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/comment/update")
    public ResponseEntity<CommentResponseDto> updateComment(@RequestBody CommentUpdateDto commentUpdateDto) {

        CommentResponseDto response = commentService.updateComment(commentUpdateDto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {

        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }
}
