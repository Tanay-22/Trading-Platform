package com.tanay.trading.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tanay.trading.model.Coin;
import com.tanay.trading.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService
{

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<Coin> getCoinList(int page) throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=10&page=" + page;
        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            List<Coin> coins = objectMapper.readValue(response.getBody(),
                    new TypeReference<List<Coin>>() {});

            return coins;
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId +
                "market_chart?vs_currency=inr&days=" + days;

        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;

        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Coin coin = new Coin();
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());

            JsonNode marketData = jsonNode.get("market_data");

            coin.setCurrentPrice(marketData.get("current_price").get("inr").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("inr").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("inr").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("inr").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("inr").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h_in_currency").get("inr").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h_in_currency")
                    .get("inr").asDouble());
            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h_in_currency").get("inr").asDouble());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h_in_currency")
                    .get("inr").asDouble());
            coin.setTotalSupply(marketData.get("total_supply").asLong());
            
            coinRepository.save(coin);

            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception
    {
        Optional<Coin> optionalCoin = coinRepository.findById(coinId);

        if(optionalCoin.isEmpty())
            throw new Exception("Coin Not Found");

        return optionalCoin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;

        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/coins/markets/vs_currency=inr&per_page=50&page=1";

        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTradingCoins() throws Exception
    {
        String url = "https://api.coingecko.com/api/v3/search/trading";

        RestTemplate restTemplate = new RestTemplate();

        try
        {
            HttpHeaders headers = new HttpHeaders();

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException e)
        {
            throw new Exception(e.getMessage());
        }
    }
}
