package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
/*@Table(name = "Plane")*/
public class Plane implements Identifiable<Long>{
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="name", nullable = false)
    private String name;

    @Column(name ="volume", nullable = false)
    private int volume;

    public Plane() {}

    public Plane(String name, int volume) {
        this.name = name;
        this.volume = volume;
    }
}
