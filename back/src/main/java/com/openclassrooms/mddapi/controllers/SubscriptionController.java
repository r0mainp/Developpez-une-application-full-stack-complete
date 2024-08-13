package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.services.SubscriptionService;

@RestController
@RequestMapping("api/subscription")
public class SubscriptionController {

    @Autowired
    SubscriptionService subscriptionService;

    @GetMapping()
    public List<Subscription> getCurrentUserSubscriptions(){
        return this.subscriptionService.getCurrentUserSubscriptions();
    }
}
