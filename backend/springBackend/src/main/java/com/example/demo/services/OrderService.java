package com.example.demo.services;

import com.example.demo.models.Order;
import com.example.demo.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public ResponseEntity<String> placeOrder(Order order) {
        orderRepository.save(order);
        return ResponseEntity.ok("Order placed successfully!");
    }

    public List<Order> listOrders() {
        return orderRepository.findAll();
    }

    public ResponseEntity<String> verifyOrder(boolean success, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (success) {
                order.setStatus("Verified");
            } else {
                order.setStatus("Failed");
            }
            orderRepository.save(order);
            return ResponseEntity.ok("Order verification updated.");
        }
        return ResponseEntity.badRequest().body("Order not found.");
    }
}