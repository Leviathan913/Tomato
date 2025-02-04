package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if a user exists by email
    boolean existsByEmail(String email);

    // Find user by token (if tokens are used for authentication or verification)
    Optional<User> findByToken(String token);

    // Check if a user exists by token
    boolean existsByToken(String token);

    // Custom query: Find user by name (case-insensitive search)
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE %:name%")
    List<User> findByNameContainingIgnoreCase(@Param("name") String name);

    // Find all users
    List<User> findAll();
}