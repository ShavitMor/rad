package RAD.account.service;

import RAD.account.exception.InvalidOrganizationInputException;
import RAD.account.exception.InvalidUserInputException;
import RAD.account.model.Organization;
import RAD.account.model.User;
import RAD.account.repository.OrganizationRepository;
import RAD.account.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Transactional
    public User createUser(String organizationName, String username, String email, String password) {
//        organizationRepository.findById(organizationId)
//                .orElseThrow(() -> new InvalidOrganizationInputException("Organization not found"));

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setOrganizationName(organizationName);

        System.out.println("hi");

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new InvalidUserInputException("User not found"));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean checkPassword(User user, String password) {
        return user.getPassword().equals(password);
    }
}