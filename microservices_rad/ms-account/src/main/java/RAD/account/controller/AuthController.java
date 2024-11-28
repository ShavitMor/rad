package RAD.account.controller;

import RAD.account.config.TokenService;
import RAD.account.dto.CreateUserRequest;
import RAD.account.model.LoginRequest;
import RAD.account.model.RegisterRequest;
import RAD.account.model.AuthResponse;
import RAD.account.model.User;
import RAD.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {


        final User user = userService.findByUsername(request.getUsername());
        if (user == null || !userService.checkPassword(user, request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        final String jwt = tokenService.generateToken(user.getUsername());
        System.out.println(jwt);
        return ResponseEntity.ok(new AuthResponse(jwt, user));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userService.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        userService.createUser(request.getOrganizationname(), request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok().build();

    }
}
