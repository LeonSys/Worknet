package com.example.worknet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String name;
    private final String email;

    public User(String name, String s) {
        this.name = name;
        this.email = s;
    }


    // standard constructors / setters / getters / toString
}