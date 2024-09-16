package com.tanay.trading.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Roi
{
    @JsonProperty("times")
    private Double times;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("percentage")
    private Double percentage;
}
