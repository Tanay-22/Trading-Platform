package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.Asset;
import com.tanay.trading.model.User;
import com.tanay.trading.service.AssetService;
import com.tanay.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController
{
    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;


    @GetMapping("{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception
    {
        Asset asset = assetService.getAssetById(assetId);

        return ResponseEntity.ok().body(asset);
    }


    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId,
                                                           @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);
        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);

        return ResponseEntity.ok().body(asset);
    }


    @GetMapping
    public ResponseEntity<List<Asset>> getAssetForUser(@RequestHeader(JwtConstant.JWT_HEADER) String jwt) throws Exception
    {
        User user = userService.findUserByJwt(jwt);
        List<Asset> assets = assetService.getUserAssets(user.getId());

        return ResponseEntity.ok().body(assets);
    }
}
