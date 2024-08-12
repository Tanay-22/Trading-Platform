package com.tanay.trading.repository;

import com.tanay.trading.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin, String>
{

}
