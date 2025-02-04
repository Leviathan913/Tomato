package com.example.demo.controllers;

import com.example.demo.models.Order;
import com.example.demo.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @GetMapping("/list")
    public List<Order> listOrders() {
        return orderService.listOrders();
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOrder(@RequestParam("success") boolean success, @RequestParam("orderId") Long orderId) {
        return orderService.verifyOrder(success, orderId);
    }
}