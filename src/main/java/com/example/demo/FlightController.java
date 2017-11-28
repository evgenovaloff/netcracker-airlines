package com.example.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class FlightController {
    private final FlightRepository flightRepository;

    @Autowired
    public FlightController(FlightRepository flightRepository) {this.flightRepository = flightRepository;}

    @RequestMapping(value = "/flightsUniqueCreate", method = RequestMethod.POST)
    public void create(@RequestBody Flight flight){
        Flight duplicate = flightRepository.findByNameFlight(flight.getNameFlight());
        if (duplicate != null){
            throw new RuntimeException("Found dublicate during creation");
        }
        flightRepository.save(flight);
    }

    @RequestMapping(value = "/flights/lite", method = RequestMethod.GET)
    public List<Flight> get() {
        List<Flight> result = new ArrayList<>();
        flightRepository.findAll().forEach(result::add);
        return result;
    }

    @RequestMapping(value = "/heroes/{id}/{nameFlight}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id, @PathVariable String nameFlight){
        log.info("Safe deleting hero with id = '{}' and nameFlight = '{}'", id, nameFlight);
        Flight flight = flightRepository.findOne(id);
        if (flight.getNameFlight().equals(nameFlight)){
            flightRepository.delete(id);
        }else{
            throw new RuntimeException("Input name doesn't equal to removing flight id");
        }
    }
}
