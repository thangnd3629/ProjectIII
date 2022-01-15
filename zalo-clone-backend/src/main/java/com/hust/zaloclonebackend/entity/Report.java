package com.hust.zaloclonebackend.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "report")
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    private String detail;

    private String subject;

}
