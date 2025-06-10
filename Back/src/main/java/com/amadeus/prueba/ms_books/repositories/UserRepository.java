package com.amadeus.prueba.ms_books.repositories;

import com.amadeus.prueba.ms_books.domains.User;
import com.amadeus.prueba.ms_books.repositories.commons.SoftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends SoftRepository<User> {

    @Query("SELECT u FROM User u WHERE u.deleted = false AND u.username = :username")
    User findByUsername(@Param("username") String username);
}
