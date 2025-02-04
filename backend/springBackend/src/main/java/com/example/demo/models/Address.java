package com.example.demo.models;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity // Indicates this is a JPA entity
@Table(name = "addresses") // Maps the entity to the "addresses" table in PostgreSQL
public class Address implements Serializable {
    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID
    private Long id;

    @Column(nullable = false) // Ensures the column cannot be null
    private String firstName;

    @Column(nullable = false) // Ensures the column cannot be null
    private String lastName;

    @Column(nullable = false) // Ensures the column cannot be null
    private String street;

    @Column(nullable = false) // Ensures the column cannot be null
    private String city;

    @Column(nullable = false) // Ensures the column cannot be null
    private String state;

    @Column(nullable = false) // Ensures the column cannot be null
    private String zipCode;

    @Column(nullable = false) // Ensures the column cannot be null
    private String country;

    @Column(nullable = false) // Ensures the column cannot be null
    private String phone;

    // Default constructor
    public Address() {}

    // Parameterized constructor
    public Address(String firstName, String lastName, String street, String city, String state, String zipCode, String country, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.phone = phone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}