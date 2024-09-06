package com.tanay.trading.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tanay.trading.model.Coin;
import com.tanay.trading.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coins")
public class CoinController
{
    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;


    @GetMapping
    ResponseEntity<List<Coin>> getCoinList(@RequestParam("page") int page) throws Exception
    {
        List<Coin> coins = coinService.getCoinList(page);

        return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
    }


    @GetMapping("{coinId}/chart")
    ResponseEntity<JsonNode> getMarketChart(@PathVariable String coinId, @RequestParam("days") int days)
            throws Exception
    {
        String marketChart = coinService.getMarketChart(coinId, days);
        JsonNode jsonNode = objectMapper.readTree(marketChart);

        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
    }


    @GetMapping("/search")
    ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws Exception
    {
        String searchedCoins = coinService.searchCoin(keyword);
        JsonNode jsonNode = objectMapper.readTree(searchedCoins);

        return ResponseEntity.ok(jsonNode);
    }


    @GetMapping("/top50")
    ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception
    {
        String searchedCoins = coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(searchedCoins);

        return ResponseEntity.ok(jsonNode);
    }


    @GetMapping("/trending")
    ResponseEntity<JsonNode> getTrendingCoin() throws Exception
    {
        String searchedCoins = coinService.getTrendingCoins();
        JsonNode jsonNode = objectMapper.readTree(searchedCoins);

        return ResponseEntity.ok(jsonNode);
    }


    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception
    {
        String coin = coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coin);

        return ResponseEntity.ok(jsonNode);
    }
}
