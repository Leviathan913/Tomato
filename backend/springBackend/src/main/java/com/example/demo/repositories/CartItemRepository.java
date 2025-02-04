package com.example.demo.repositories;

import com.example.demo.models.CartItem;
import com.example.demo.models.Food;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    CartItem findByUserAndFood(User user, Food food);
}