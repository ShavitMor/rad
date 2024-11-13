package RAD.account.model;


import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;


@Data
@Entity
@Table(name = "organizations")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
}




