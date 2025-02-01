package com.example.demo.controllers;

import com.example.demo.models.Food;
import com.example.demo.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/add")
    public ResponseEntity<String> addFood(@RequestParam("name") String name,
                                          @RequestParam("description") String description,
                                          @RequestParam("category") String category,
                                          @RequestParam("price") Double price,
                                          @RequestParam("image") MultipartFile image) {
        return foodService.addFood(name, description, category, price, image);
    }

    @GetMapping("/list")
    public List<Food> listFood() {
        return foodService.listFood();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteFood(@RequestParam("id") String id) {
        return foodService.deleteFood(id);
    }
}
