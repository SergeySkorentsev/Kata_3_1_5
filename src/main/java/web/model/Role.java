package web.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    @Getter
    private int id;

    @Column(name = "role_name", nullable = false, unique = true)
    @Getter
    @Setter
    private String roleName;

    @ManyToMany(mappedBy = "roles")
//    @JoinTable(name = "users_roles",
//            joinColumns = @JoinColumn(name = "RoleId"),
//            inverseJoinColumns = @JoinColumn(name = "UserId")
//    )
//    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
    @Getter
    @Setter
    private List<User> users;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return roleName;
    }

    public String getCutRoleName() {
        return roleName.split("_")[1];
    }
}
