package RAD.account.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String organizationname;
    private String username;
    private String email;
    private String password;

}