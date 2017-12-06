package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Route")
public class Route implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="departurePoint", nullable = false)
    private String departurePoint;

    @Column(name ="arrivalPoint", nullable = false)
    private String arrivalPoint;

    public Route() {}

    public Route(String departurePoint, String arrivalPoint) {
        this.departurePoint = departurePoint;
        this.arrivalPoint = arrivalPoint;
    }
}
