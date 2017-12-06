package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
/*@Table(name = "Order")*/
public class Order implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="buyerId", nullable = false)
    private int buyerId;

    @Column(name ="flightId", nullable = false)
    private int flightId;

    @Column(name ="tickets", nullable = false)
    private int tickets;

    public Order(int buyerId, int flightId, int tickets) {
        this.buyerId = buyerId;
        this.flightId = flightId;
        this.tickets = tickets;
    }
}
