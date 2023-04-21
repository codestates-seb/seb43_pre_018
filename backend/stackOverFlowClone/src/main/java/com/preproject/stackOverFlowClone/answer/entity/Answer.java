package com.preproject.stackOverFlowClone.answer.entity;

import com.preproject.stackOverFlowClone.member.entity.Member;
import com.preproject.stackOverFlowClone.ask.entity.Ask;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Answer {   // 객체 말고 id 를 엮고, 레포지토리 딴에서 쿼리를 던져주자.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime created_at = LocalDateTime.now();

    private Long MemberId;

    private Long AskId;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "ASK_ID")
//    private Ask ask;
}
