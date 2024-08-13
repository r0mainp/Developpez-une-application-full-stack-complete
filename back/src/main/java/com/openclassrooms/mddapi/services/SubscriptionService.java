package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

public class SubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserService userService;

    public List<Subscription> getCurrentUserSubscriptions(){
        Integer currentUserId = this.userService.getCurrentUser().getId();

        return this.subscriptionRepository.findByUserId(currentUserId);
    }
}
