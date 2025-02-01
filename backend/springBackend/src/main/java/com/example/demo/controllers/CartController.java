package com.example.demo.controllers;

import com.example.demo.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam("userId") String userId, @RequestParam("itemId") String itemId) {
        return cartService.addToCart(userId, itemId);
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam("userId") String userId, @RequestParam("itemId") String itemId) {
        return cartService.removeFromCart(userId, itemId);
    }

    @PostMapping("/get")
    public ResponseEntity<Map<String, Integer>> getCart(@RequestParam("userId") String userId) {
        return cartService.getCart(userId);
    }
}
