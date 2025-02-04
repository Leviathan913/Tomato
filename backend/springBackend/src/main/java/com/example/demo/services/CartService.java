package com.example.demo.services;

import com.example.demo.models.CartItem;
import com.example.demo.models.Food;
import com.example.demo.models.User;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.FoodRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public ResponseEntity<String> addToCart(Long userId, Long foodId) {
        User user = userRepository.findById(userId).orElse(null);
        Food food = foodRepository.findById(foodId).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        if (food == null) {
            return ResponseEntity.badRequest().body("Food item not found.");
        }

        CartItem cartItem = cartItemRepository.findByUserAndFood(user, food);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        } else {
            cartItem = new CartItem(user, food, 1);
        }

        cartItemRepository.save(cartItem);
        return ResponseEntity.ok("Item added to cart.");
    }

    public ResponseEntity<String> removeFromCart(Long userId, Long foodId) {
        User user = userRepository.findById(userId).orElse(null);
        Food food = foodRepository.findById(foodId).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        if (food == null) {
            return ResponseEntity.badRequest().body("Food item not found.");
        }

        CartItem cartItem = cartItemRepository.findByUserAndFood(user, food);
        if (cartItem != null) {
            if (cartItem.getQuantity() > 1) {
                cartItem.setQuantity(cartItem.getQuantity() - 1);
            } else {
                cartItemRepository.delete(cartItem);
            }
            cartItemRepository.save(cartItem);
            return ResponseEntity.ok("Item removed from cart.");
        }
        return ResponseEntity.badRequest().body("Item not in cart.");
    }

    public ResponseEntity<List<CartItem>> getCart(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<CartItem> cartItems = cartItemRepository.findByUser(user);
            return ResponseEntity.ok(cartItems);
        }
        return ResponseEntity.badRequest().body(null);
    }
}