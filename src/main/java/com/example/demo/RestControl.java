package com.example.demo;


import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControl {

    @RequestMapping("/greeting")
    public ArrayList<Flight> greeting(@RequestParam(value="id", required=false, defaultValue="World") String id) {
        ArrayList<Flight> list = new ArrayList<>();
        list.add(new Flight("ывава", "ывава", "ывава", "ывава", "ывава"));
        list.add(new Flight("ывава", "ывава", "ывава", "ывава", "ывава"));
        return list;
    }
}