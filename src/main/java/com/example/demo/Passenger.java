package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name = "passengers")
public class Passenger implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="numberTicket", nullable = false, unique = true)
    private int numberTicket;

    @Column(name ="firstname", nullable = false)
    private String firstName;

    @Column(name ="secondname", nullable = false)
    private String secondName;

    @Column(name ="gender", nullable = false)
    private String gender;

    @Column(name ="borndate", nullable = false)
    private Date bornDate;

    @Column(name ="flight", nullable = false)
    private String flights;

    public Passenger() {}

    public Passenger(int numberTicket, String firstname, String secondname, String gender, Date borndate, String flights) {}
}
