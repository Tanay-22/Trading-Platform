package com.tanay.trading.service;

import com.tanay.trading.model.Coin;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Watchlist;

public interface WatchlistService
{
    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
