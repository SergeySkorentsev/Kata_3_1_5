package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
//    @Query("select r from Role r where r.roleName = :roleName")
//    Role getRoleByRolename (String roleName);
//
//    @Query("select r from Role r where r.id = :id")
//    Role getRoleById (int id);
}
