package web.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@NoArgsConstructor
@ToString
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    @Getter
    @Setter
    private int id;
    @Column(name = "FirstName")
    @Setter
    @Getter
//    @NotBlank(message = "Name must not be empty")
//    @Size(min = 2, max = 100, message = "Name must be from 2 to 100 symbols lenght")
    private String firstName;
    @Column(name = "LastName")
    @Getter
    @Setter
//    @NotBlank(message = "Lastname must not be empty")
//    @Size(min = 2, max = 32, message = "Department must be from 2 to 32 symbols lenght")
    private String lastName;
    @Column(name = "Age")
    @Getter
    @Setter
//    @NotBlank(message = "Age must not be empty")
//    @Min(value = 0, message = "Age must not be less than 0")
//    @Max(value = 120, message = " Age must not be greater than 120")
    private int age;
    @Column(name = "Email")
    @Getter
    @Setter
//    @NotBlank(message = "Email must not be empty")
//    @Size(min = 2, max = 32, message = "Department must be from 10 to 32 symbols lenght")
    private String email;
    @Column(name = "Pass")
    @Getter
    @Setter
//    @NotBlank(message = "Password must not be empty")
//    @Size(min = 6, max = 12, message = "Password must be from 6 to 12 symbols lenght")
    private String password;

    @ManyToMany (fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "UserId"),
            inverseJoinColumns = @JoinColumn(name = "RoleId")
    )
    @Getter
    @Setter
    private List<Role> roles;

    public User(String firstName, String lastName, int age, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRoleName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getCutRoles() {
        String cutRoles = "";
        for (Role r : this.roles) {
            cutRoles += r.getCutRoleName() + " ";
        }
        return cutRoles.trim();
    }
}