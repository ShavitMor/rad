package RAD.account.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String organizationId;
    private String username;
    private String email;
    private String password;

}