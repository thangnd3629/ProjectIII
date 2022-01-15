package com.hust.zaloclonebackend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "relationship")
public class Relationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long relationshipId;

    @ManyToOne
    User userA;

    @ManyToOne
    User userB;
}
