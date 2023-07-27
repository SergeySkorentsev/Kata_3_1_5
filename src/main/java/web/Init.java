package web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import web.model.Role;
import web.model.User;
import web.repository.RoleRepository;
import web.repository.UserRepository;
import web.service.RoleService;
import web.service.UserService;


import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Component
public class Init {

    private final UserService userService;
    private final RoleService roleService;
    @Autowired
    public Init(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    @Transactional
    public void InitUsers() {
        if (userService.getAllUsers().size() == 0) {
            User userAdmin = new User(
                    "admin",
                    "admin",
                    0,
                    "admin@site.ru",
                    "admin"
            );
            User userUser = new User(
                    "user",
                    "user",
                    0,
                    "user@site.ru",
                    "user"
            );
            Role roleAdmin = new Role("ROLE_ADMIN");
            Role roleUser = new Role("ROLE_USER");
            List<Role> roles = Arrays.asList(roleAdmin, roleUser);
            roleService.saveAllRoles(roles);
            userAdmin.setRoles(Arrays.asList(roleAdmin));
            userUser.setRoles(Arrays.asList(roleUser));
            userService.addUser(userAdmin);
            userService.addUser(userUser);
        }
    }
}
