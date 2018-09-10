package com.hiddenFounders.repositories;

import com.hiddenFounders.models.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository("shopRepository")
public interface ShopRepository extends MongoRepository<Shop,String> {
    public Page<Shop> findByLocationNear(Point location, Distance distance, Pageable pageable) ;
}
