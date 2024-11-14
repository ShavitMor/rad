package RAD.account.controller;

import RAD.account.dto.CreateUserRequest;
import RAD.account.model.User;
import RAD.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest createUserRequest) {
        logger.info("Creating new user with username: {}", createUserRequest.getUsername());
        if (userService.emailExists(createUserRequest.getEmail())) {
            logger.warn("Email already exists: {}", createUserRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        System.out.println("HEREEEE2" + createUserRequest.getOrganizationname());
        User user = userService.createUser(createUserRequest.getOrganizationname(), createUserRequest.getUsername(), createUserRequest.getEmail(), createUserRequest.getPassword());
        logger.info("User created successfully with ID: {}", user.getId());

        return ResponseEntity.ok(user);

    }

    @GetMapping
    public List<User> getAllUsers() {
        logger.info("Retrieving all users");

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        logger.info("Retrieving user with ID: {}", id);
        return userService.getUserById(id)
                .map(user -> {
                    logger.info("User found with ID: {}", id);
                    return ResponseEntity.ok(user);
                })
                .orElseGet(() -> {
                    logger.warn("User with ID: {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        logger.info("Updating user with ID: {}", id);
        User updatedUser = userService.updateUser(id, userDetails);
        logger.info("User updated successfully with ID: {}", id);
        return ResponseEntity.ok(updatedUser);    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        logger.info("Deleting user with ID: {}", id);
        userService.deleteUser(id);
        logger.info("User deleted successfully with ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}