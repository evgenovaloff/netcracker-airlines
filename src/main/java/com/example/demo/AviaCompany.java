package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "AviaCompany")
public class AviaCompany implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="name", nullable = false)
    private String name;

    public AviaCompany() {}

    public AviaCompany(String name) {
        this.name = name;
    }
}
