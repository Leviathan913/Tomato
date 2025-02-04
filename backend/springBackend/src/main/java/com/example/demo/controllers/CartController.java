package com.example.demo.controllers;

import com.example.demo.services.CartService;
import com.example.demo.models.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam("userId") Long userId, @RequestParam("foodId") Long foodId) {
        return cartService.addToCart(userId, foodId);
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam("userId") Long userId, @RequestParam("foodId") Long foodId) {
        return cartService.removeFromCart(userId, foodId);
    }

    @GetMapping("/get")
    public ResponseEntity<List<CartItem>> getCart(@RequestParam("userId") Long userId) {
        return cartService.getCart(userId);
    }
}