package RAD.account.service;

import RAD.account.exception.InvalidOrganizationInputException;
import RAD.account.model.Organization;
import RAD.account.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public Organization createOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> getOrganizationById(String id) {
        return organizationRepository.findById(id);
    }

    public Organization updateOrganization(String id, Organization organizationDetails) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new InvalidOrganizationInputException("Organization not found"));

        organization.setName(organizationDetails.getName());
        organization.setAddress(organizationDetails.getAddress());

        return organizationRepository.save(organization);
    }

    public void deleteOrganization(String id) {
        organizationRepository.deleteById(id);
    }
}