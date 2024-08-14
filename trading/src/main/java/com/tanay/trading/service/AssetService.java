package com.tanay.trading.service;

import com.tanay.trading.model.Asset;
import com.tanay.trading.model.Coin;
import com.tanay.trading.model.User;

import java.util.List;

public interface AssetService
{
    Asset createAsset(User user, Coin coin, double quantity);

    Asset getAssetById(Long assetId);

    Asset getAssetByUserIdAndId(Long userId, Long assetId);

    List<Asset> getUserAssets(Long userId);

    Asset updateAsset(Long assetId, double quantity);

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId);
}
