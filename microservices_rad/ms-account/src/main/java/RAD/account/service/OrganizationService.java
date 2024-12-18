package RAD.account.service;

import RAD.account.exception.InvalidOrganizationInputException;
import RAD.account.model.Organization;
import RAD.account.repository.OrganizationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;


import java.util.List;
import java.util.Optional;
@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger log = LoggerFactory.getLogger(OrganizationService.class);

    @Transactional
    public Organization createOrganization(Organization organization) {

        // Validate organization
        validateOrganization(organization);

        // Sanitize and set schema name
        String schemaName = sanitizeSchemaName(organization.getName());

        // Check if organization/schema already exists
        if (schemaExists(schemaName)) {
            throw new InvalidOrganizationInputException(
                    "Organization with name '" + organization.getName() + "' already exists"
            );
        }

        try {
            // Create schema and tables
            createSchemaWithTables(schemaName);
            log.info("Created new schema and tables for organization: {}", schemaName);

            // Save organization
            Organization savedOrg = organizationRepository.save(organization);
            log.info("Created new organization: {}", savedOrg.getName());

            return savedOrg;
        } catch (DataAccessException e) {
            log.error("Failed to create organization: {}", e.getMessage());
            throw new InvalidOrganizationInputException("Failed to create schema for organization: " + organization.getName());
        }
    }

    private void validateOrganization(Organization organization) {
        if (organization == null) {
            throw new InvalidOrganizationInputException("Organization cannot be null");
        }
        if (!StringUtils.hasText(organization.getName())) {
            throw new InvalidOrganizationInputException("Organization name cannot be empty");
        }
        if (organization.getName().length() < 2 || organization.getName().length() > 50) {
            throw new InvalidOrganizationInputException("Organization name must be between 2 and 50 characters");
        }
        if (!organization.getName().matches("^[a-zA-Z0-9\\s-_]+$")) {
            throw new InvalidOrganizationInputException("Organization name can only contain letters, numbers, spaces, hyphens, and underscores");
        }
    }

    private boolean schemaExists(String schemaName) {
        String sql = """
            SELECT COUNT(*)
            FROM information_schema.schemata
            WHERE schema_name = ?
        """;
        return jdbcTemplate.queryForObject(sql, Integer.class, schemaName) > 0;
    }

    private void createSchemaWithTables(String schemaName) {
        // SQL for schema creation
        String createSchemaSQL = String.format("CREATE SCHEMA %s", schemaName);
        jdbcTemplate.execute(createSchemaSQL);
        log.info("Created schema: {}", schemaName);

        // SQL for users table creation
        String createUsersTableSQL = String.format("""
            CREATE TABLE %s.users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                organizationname VARCHAR(100)
            )
        """, schemaName);
        jdbcTemplate.execute(createUsersTableSQL);
        log.info("Created users table in schema: {}", schemaName);


    }

    private String sanitizeSchemaName(String organizationName) {
        // Convert to lowercase and replace spaces/special chars with underscores
        String sanitized = organizationName.toLowerCase()
                .replaceAll("[^a-z0-9]", "_")
                .replaceAll("_{2,}", "_")
                .replaceAll("^_|_$", "");

        // Ensure it starts with a letter (PostgreSQL requirement)
        if (!sanitized.matches("^[a-z].*")) {
            sanitized = "org_" + sanitized;
        }

        return sanitized;
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> getOrganizationById(long id) {
        return organizationRepository.findById(id);
    }

    public Organization updateOrganization(long id, Organization organizationDetails) {
        // Retrieve the existing organization
        Organization existingOrganization = organizationRepository.findById(id)
                .orElseThrow(() -> new InvalidOrganizationInputException("Organization not found"));

        // Validate the new organization name
        validateOrganization(organizationDetails);

        // Sanitize the old and new schema names
        String oldSchemaName = sanitizeSchemaName(existingOrganization.getName());
        String newSchemaName = sanitizeSchemaName(organizationDetails.getName());

        if (schemaExists(newSchemaName)) {
            throw new InvalidOrganizationInputException(
                    "An organization with the name '" + organizationDetails.getName() + "' already exists"
            );
        }

        try {
            // Rename the schema if the name has changed
            if (!oldSchemaName.equals(newSchemaName)) {
                renameSchema(oldSchemaName, newSchemaName);
                log.info("Renamed schema from '{}' to '{}'", oldSchemaName, newSchemaName);
            }

            // Update the organization's name and other details
            existingOrganization.setName(organizationDetails.getName());
            existingOrganization.setAddress(organizationDetails.getAddress());
            Organization updatedOrganization = organizationRepository.save(existingOrganization);

            log.info("Updated organization with ID: {}", id);
            return updatedOrganization;
        } catch (DataAccessException e) {
            log.error("Failed to update organization or rename schema: {}", e.getMessage());
            throw new InvalidOrganizationInputException("Failed to update organization: " + organizationDetails.getName());
        }
    }

    private void renameSchema(String oldSchemaName, String newSchemaName) {
        String renameSchemaSQL = String.format("ALTER SCHEMA %s RENAME TO %s", oldSchemaName, newSchemaName);
        jdbcTemplate.execute(renameSchemaSQL);
        log.info("Renamed schema from '{}' to '{}'", oldSchemaName, newSchemaName);
    }

    public void deleteOrganization(long id) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new InvalidOrganizationInputException("Organization not found"));

        // Sanitize the schema name based on the organization's name
        String schemaName = sanitizeSchemaName(organization.getName());

        try {
            // Drop the schema associated with the organization
            deleteSchema(schemaName);
            log.info("Deleted schema: {}", schemaName);

            // Delete the organization record from the database
            organizationRepository.deleteById(id);
            log.info("Deleted organization with ID: {}", id);
        } catch (DataAccessException e) {
            log.error("Failed to delete schema for organization: {}", organization.getName());
            throw new InvalidOrganizationInputException("Failed to delete schema for organization: " + organization.getName());
        }
    }

    private void deleteSchema(String schemaName) {
        // SQL to drop the schema and all its objects
        String dropSchemaSQL = String.format("DROP SCHEMA IF EXISTS %s CASCADE", schemaName);
        jdbcTemplate.execute(dropSchemaSQL);
        log.info("Dropped schema: {}", schemaName);
    }
}
