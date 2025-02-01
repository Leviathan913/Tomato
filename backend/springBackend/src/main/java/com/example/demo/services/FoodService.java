package com.example.demo.services;

import com.example.demo.models.Food;
import com.example.demo.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public ResponseEntity<String> addFood(String name, String description, String category, Double price, MultipartFile image) {
        try {
            Food food = new Food();
            food.setName(name);
            food.setDescription(description);
            food.setCategory(category);
            food.setPrice(price);
            food.setImage(new String(image.getBytes()));
            foodRepository.save(food);
            return ResponseEntity.ok("Food added successfully!");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error adding food.");
        }
    }

    public List<Food> listFood() {
        return foodRepository.findAll();
    }

    public ResponseEntity<String> deleteFood(String id) {
        foodRepository.deleteById(id);
        return ResponseEntity.ok("Food deleted successfully!");
    }
}
