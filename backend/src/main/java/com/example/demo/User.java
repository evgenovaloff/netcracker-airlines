package com.example.demo;

import lombok.Data;

import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "User")
public class User implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name ="login", nullable = false)
    private String login;

    @Column(name ="password", nullable = false)
    private String password;

    @Column(name ="roles", nullable = false)
    private String roles;

    public User(){}

    public User(String login, String password, String roles){
        this.login = login;
        this.password = password;
        this.roles = roles;
    }
}
