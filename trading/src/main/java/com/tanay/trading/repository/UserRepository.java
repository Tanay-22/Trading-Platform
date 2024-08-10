package com.tanay.trading.repository;

import com.tanay.trading.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>
{
    User findByEmail(String email);
}
