package com.preproject.stackOverFlowClone.ask.entity;

import com.preproject.stackOverFlowClone.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Ask(String title, String content, Long memberId) {
        this.title = title;
        this.content = content;
        this.memberId = memberId;
    }
}
