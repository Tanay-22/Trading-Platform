package com.tanay.trading.repository;

import com.tanay.trading.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long>
{
    Watchlist findByUserId(Long userId);
}
