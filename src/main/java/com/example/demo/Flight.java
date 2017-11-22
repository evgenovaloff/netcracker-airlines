package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Flight")
public class Flight implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="nameFlight", nullable = false, unique = true)
    private String nameFlight;

    @Column(name ="typeAircraft", nullable = false)
    private String typeAircraft;

    @Column(name ="departureFlight", nullable = false)
    private String departureFlight;

    @Column(name ="destinationFlight", nullable = false)
    private String destinationFlight;

    @Column(name ="company", nullable = false)
    private String company;

    public Flight() {}

    public Flight(String nameFlight, String typeAircraft, String departureFlight, String destinationFlight, String company) {}

}
