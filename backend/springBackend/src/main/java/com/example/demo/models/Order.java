package com.example.demo.models;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity // Indicates this is a JPA entity
@Table(name = "orders") // Maps the entity to the "orders" table in PostgreSQL
public class Order implements Serializable {
    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Establishes a many-to-one relationship with User
    @JoinColumn(name = "user_id", nullable = false) // Links the user to this order
    private User user;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER) // Establishes a one-to-many relationship with Food
    @JoinColumn(name = "order_id") // Links the food items to this order
    private List<Food> items;

    @Column(nullable = false, precision = 10) // Ensures the column stores decimal values with precision
    private Double amount;

    @Column(nullable = false) // Ensures the column cannot be null
    private String status;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER) // Establishes a one-to-one relationship with Address
    @JoinColumn(name = "address_id") // Links the address to this order
    private Address address;

    // Default constructor
    public Order() {}

    // Parameterized constructor
    public Order(User user, List<Food> items, Double amount, String status, Address address) {
        this.user = user;
        this.items = items;
        this.amount = amount;
        this.status = status;
        this.address = address;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Food> getItems() {
        return items;
    }

    public void setItems(List<Food> items) {
        this.items = items;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}