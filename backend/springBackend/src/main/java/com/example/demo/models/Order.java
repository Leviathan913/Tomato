package com.example.demo.models;

import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private List<Food> items;
    private Double amount;
    private String status;
    private Address address;
    public Order(){}

    public Order(List<Food> items, Double amount, String status, RabbitConnectionDetails.Address address) {
        this.items = items;
        this.amount = amount;
        this.status = status;
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public RabbitConnectionDetails.Address getAddress() {
        return address;
    }

    public void setAddress(RabbitConnectionDetails.Address address) {
        this.address = address;
    }
}
