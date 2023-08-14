package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class RestApiAdminController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public RestApiAdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/roles")
    public List<Role> listRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") int id) {
        return  userService.getUser(id);
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> save(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<HttpStatus> update(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        User user = userService.getUser(id);
        userService.deleteUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
