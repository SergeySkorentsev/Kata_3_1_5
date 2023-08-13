package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;
import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class RestApiUserController {

    private UserService userService;

    @Autowired
    public RestApiUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public User currentUser(Principal principal) {
        return userService.findUserByUsername(principal.getName());
    }
}
