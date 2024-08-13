package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
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

    public List<Subscription> getCurrentUserSubscriptions(){
        
        currentUser = this.userService.getCurrentUser();
        return this.subscriptionRepository.findByUserId(currentUser.getId());
    }

    public Subscription subscribe(SubscriptionRequest request){
        currentUser = this.userService.getCurrentUser();
        Theme theme = this.themeService.findById(request.getTheme_id()).orElse(null);
        Subscription subscription = new Subscription()
            .setUser(currentUser)
            .setTheme(theme);
        return this.subscriptionRepository.save(subscription);

    }

    public void unsubscribe(Subscription subscription){
        this.subscriptionRepository.delete(subscription);
    }
}
