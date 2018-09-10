package com.hiddenFounders.rest;

import com.hiddenFounders.models.Account;
import com.hiddenFounders.models.Shop;
import com.hiddenFounders.models.holders.LocationHolder;
import com.hiddenFounders.models.holders.LocationParamsHolder;
import com.hiddenFounders.repositories.AccountRepository;
import com.hiddenFounders.repositories.ShopRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.geo.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController("/shop")
public class ShopRestController {

    AccountRepository accountRepository ;

    ShopRepository shopRepository ;

    ShopRestController(ShopRepository shopRepository, AccountRepository accountRepository ){
        this.shopRepository = shopRepository ;
        this.accountRepository = accountRepository ;
    }

    @GetMapping
    Page<Shop> shopPage(int page, int size){
        return shopRepository.findAll(new PageRequest(page,size)) ;
    }

    @PostMapping
    Page<Shop> nearShopsList(@RequestBody LocationParamsHolder locationParamsHolder, @RequestParam(defaultValue = "0") int page,
                             @RequestParam(defaultValue = "5") int size){
        LocationHolder locationHolder = locationParamsHolder.location ;
        double dist = locationParamsHolder.distance ;
        if(dist <= 0)
            throw new IllegalArgumentException();
        //GeoJsonPoint point = new GeoJsonPoint(locationHolder.getCoordinates()[0],locationHolder.getCoordinates()[1]);
        Point point = new Point(locationHolder.getCoordinates()[0],locationHolder.getCoordinates()[1]) ;
        Distance distance = new Distance(dist, Metrics.KILOMETERS);
        return shopRepository.findByLocationNear(point, distance, new PageRequest(page, size));
    }



    @GetMapping("/shop/like/{id}")
    ResponseEntity<?> likeShop(@PathVariable("id") String id){
        Account account = accountRepository.findAccountByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName() );

        if (shopRepository.findOne(id) == null)
            throw new IllegalArgumentException("No shop found with id : " + id) ;

        if (account.getLikedShops() == null )
            account.setLikedShops(new ArrayList<>());

        if(!account.getLikedShops().contains(id))
            account.getLikedShops().add(id) ;

        return ResponseEntity.ok(accountRepository.save(account).getLikedShops());
    }

    @GetMapping("/shop/unlike/{id}")
    ResponseEntity<?> unlikeShop(@PathVariable("id") String id){
        Account account = accountRepository.findAccountByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName() );

        if (shopRepository.findOne(id) == null)
            throw new IllegalArgumentException("No shop found with id : " + id) ;

        if (account.getLikedShops() == null )
            account.setLikedShops(new ArrayList<>());

        account.getLikedShops().remove(id) ;

        return ResponseEntity.ok(accountRepository.save(account).getLikedShops());
    }

    @GetMapping("/shop/prefered")
    ResponseEntity<?> preferedShops(){
        Account account = accountRepository.findAccountByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName() );

        List<Shop> shopsResult=new ArrayList<>();
        account.getLikedShops().stream()
                .forEach((e) -> shopsResult.add(this.shopRepository.findOne(e)));

        return ResponseEntity.ok(shopsResult);
    }

}
