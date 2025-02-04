package com.example.demo.services;

import com.example.demo.models.Food;
import com.example.demo.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    // Define a directory to store images
    private final String UPLOAD_DIR = "uploads/";

    public ResponseEntity<String> addFood(String name, String description, String category, Double price, MultipartFile image) {
        try {
            // Save the image to the file system
            if (image != null && !image.isEmpty()) {
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.createDirectories(filePath.getParent());
                Files.copy(image.getInputStream(), filePath);

                // Store the file path in the database
                Food food = new Food();
                food.setName(name);
                food.setDescription(description);
                food.setCategory(category);
                food.setPrice(price);
                food.setImage(filePath.toString()); // Store the file path
                foodRepository.save(food);
                return ResponseEntity.ok("Food added successfully!");
            } else {
                return ResponseEntity.badRequest().body("Image file is required.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error adding food.");
        }
    }

    public List<Food> listFood() {
        return foodRepository.findAll();
    }

    public ResponseEntity<String> deleteFood(Long id) {
        if (foodRepository.existsById(id)) {
            Food food = foodRepository.findById(id).orElse(null);
            if (food != null) {
                // Delete the image file from the file system
                Path filePath = Paths.get(food.getImage());
                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.badRequest().body("Error deleting image file.");
                }
                foodRepository.deleteById(id);
                return ResponseEntity.ok("Food deleted successfully!");
            }
        }
        return ResponseEntity.badRequest().body("Food not found.");
    }
}