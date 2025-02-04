package com.example.demo.repositories;

import com.example.demo.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    // Find food by name (case-insensitive search)
    List<Food> findByNameContainingIgnoreCase(String name);

    // Find food by category
    List<Food> findByCategory(String category);

    // Find food by price range
    List<Food> findByPriceBetween(Double minPrice, Double maxPrice);

    // Custom query: Find food by name and category
    @Query("SELECT f FROM Food f WHERE LOWER(f.name) LIKE %:name% AND f.category = :category")
    List<Food> findByNameAndCategory(@Param("name") String name, @Param("category") String category);

    // Find food by ID
    Optional<Food> findById(Long id);

    // Check if a food item exists by name
    boolean existsByName(String name);
}