package RAD.account.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String jwt;
    private User user;

    public AuthResponse(String jwt, User user) {
        this.jwt = jwt;
        this.user = user;
    }
}
