package com.preproject.stackOverFlowClone.ask.entity;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Ask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Ask(String title, String content, Member member) {
        this.title = title;
        this.content = content;
        this.member = member;
    }
}
