package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.Coin;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Watchlist;
import com.tanay.trading.service.CoinService;
import com.tanay.trading.service.UserService;
import com.tanay.trading.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController
{
    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;


    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader(JwtConstant.JWT_HEADER) String jwt)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());

        return ResponseEntity.ok(watchlist);
    }


    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchListById(@PathVariable Long watchlistId)
            throws Exception
    {
        Watchlist watchlist = watchlistService.findById(watchlistId);

        return ResponseEntity.ok(watchlist);
    }


    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                        @PathVariable String coinId)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchlistService.addItemToWatchlist(coin, user);

        return ResponseEntity.ok(addedCoin);
    }

}
