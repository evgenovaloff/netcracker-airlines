package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Ticket")
public class Ticket implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="buyerId", nullable = false)
    private int buyerId;

    @Column(name ="price", nullable = false)
    private double price;

    @Column(name ="flightId", nullable = false)
    private Long flightId;

    @Column(name ="passengerName", nullable = false)
    private String travelTime;

    public Ticket(){}

    public Ticket(int buyerId, double price, Long flightId, String travelTime){
        this.buyerId = buyerId;
        this.price = price;
        this.flightId = flightId;
        this.travelTime = travelTime;
    }
}
