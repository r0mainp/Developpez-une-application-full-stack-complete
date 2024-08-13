package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.payload.request.UnsubscriptionRequest;
import com.openclassrooms.mddapi.payload.response.SubscriptionResponse;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@Service
public class SubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserService userService;

    @Autowired
    ThemeService themeService;

    private User currentUser;

    public List<SubscriptionResponse> getCurrentUserSubscriptions(){
        
        currentUser = this.userService.getCurrentUser();
        List<Subscription> subscriptions = this.subscriptionRepository.findByUserId(currentUser.getId());
        return subscriptions.stream()
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());
    }

    public Subscription subscribe(SubscriptionRequest request){
        currentUser = this.userService.getCurrentUser();
        Theme theme = this.themeService.findById(request.getTheme_id()).orElse(null);
        Subscription subscription = new Subscription()
            .setUser(currentUser)
            .setTheme(theme);
        return this.subscriptionRepository.save(subscription);

    }

    public void unsubscribe(UnsubscriptionRequest request){
        System.out.println("DELETYE" + request.getId());
        Subscription subscription = this.subscriptionRepository.findById(request.getId()).orElse(null);
        this.subscriptionRepository.delete(subscription);
    }

    public SubscriptionResponse convertToResponse(Subscription subscription) {
        SubscriptionResponse response =  new SubscriptionResponse();
            response.setId(subscription.getId());
            response.setTheme_id(subscription.getTheme().getId());
            response.setUser_id(subscription.getUser().getId());
            response.setCreatedAt(subscription.getCreatedAt());

        return response;
    }
}
