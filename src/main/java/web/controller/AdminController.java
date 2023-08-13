package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    @GetMapping()
    public String getUsers() {
        return "/admin/admin";
    }
}
