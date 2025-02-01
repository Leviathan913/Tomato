package com.example.demo.services;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CartService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> addToCart(String userId, String itemId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.getCart().put(itemId, user.getCart().getOrDefault(itemId, 0) + 1);
            userRepository.save(user);
            return ResponseEntity.ok("Item added to cart.");
        }
        return ResponseEntity.badRequest().body("User not found.");
    }

    public ResponseEntity<String> removeFromCart(String userId, String itemId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            if (user.getCart().containsKey(itemId)) {
                if (user.getCart().get(itemId) > 1) {
                    user.getCart().put(itemId, user.getCart().get(itemId) - 1);
                } else {
                    user.getCart().remove(itemId);
                }
                userRepository.save(user);
                return ResponseEntity.ok("Item removed from cart.");
            }
            return ResponseEntity.badRequest().body("Item not in cart.");
        }
        return ResponseEntity.badRequest().body("User not found.");
    }

    public ResponseEntity<Map<String, Integer>> getCart(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return ResponseEntity.ok(user.getCart());
        }
        return ResponseEntity.badRequest().body(null);
    }
}
