package com.example.demo;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface FlightRepository extends PagingAndSortingRepository<Flight,Long>{
    Flight findByNameFlight(String nameFlight);
}
