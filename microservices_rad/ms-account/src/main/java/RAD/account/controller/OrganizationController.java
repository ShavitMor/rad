package RAD.account.controller;


import RAD.account.model.Organization;
import RAD.account.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    private static final Logger logger = LoggerFactory.getLogger(OrganizationController.class);
    @Autowired
    private OrganizationService organizationService;

    @PostMapping
    public Organization createOrganization(@RequestBody Organization organization) {
        logger.info("Creating new organization: {}", organization.getName());

        return organizationService.createOrganization(organization);
    }

    @GetMapping
    public List<Organization> getAllOrganizations() {
        logger.info("Retrieving all organizations");

        return organizationService.getAllOrganizations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable long id) {
        logger.info("Retrieving organization with ID: {}", id);
        return organizationService.getOrganizationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    logger.warn("Organization with ID: {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<Organization> updateOrganization(@PathVariable long id, @RequestBody Organization organizationDetails) {
        logger.info("Updating organization with ID: {}", id);

        return ResponseEntity.ok(organizationService.updateOrganization(id, organizationDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrganization(@PathVariable long id) {
        logger.info("Deleting organization with ID: {}", id);
        organizationService.deleteOrganization(id);
        logger.info("Organization deleted successfully with ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}