package web.service;
import web.model.User;
import java.util.List;

public interface UserService {
    void addUser(User user);

    void updateUser(User updatedUser) ;

    void deleteUser(User user);

    User getUser(int id);

    List<User> getAllUsers();

    User findUserByUsername(String username);

}
