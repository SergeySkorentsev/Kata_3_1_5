package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import web.model.User;
import web.service.UserServiceImpl;

import java.security.Principal;

@Controller
public class UserController {
    @GetMapping(value = "/user")
    public String getUser() {
        return "/user/user";
    }
}
