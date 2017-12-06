package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "Flight")
public class Flight implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="plane", nullable = false)
    private String plane;

    @Column(name ="routeId", nullable = false)
    private int routeId;

    @Column(name ="departure", nullable = false)
    private Date departure;

    @Column(name ="travelTime", nullable = false)
    private Long travelTime;

    public Flight() {}

    public Flight(String plane, int routeId, Date departure, Long travelTime) {
        this.plane = plane;
        this.routeId = routeId;
        this.departure = departure;
        this.travelTime = travelTime;
    }

}
