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

/**
 * Service class for managing user subscriptions to themes.
 * Provides methods to get current user subscriptions, subscribe to a theme, and unsubscribe from a theme.
 */
@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ThemeService themeService;

    private User currentUser;

    /**
     * Retrieves all subscriptions for the currently authenticated user.
     * 
     * @return A list of {@link SubscriptionResponse} objects representing the current user's subscriptions.
     */
    public List<SubscriptionResponse> getCurrentUserSubscriptions() {
        currentUser = this.userService.getCurrentUser();
        List<Subscription> subscriptions = this.subscriptionRepository.findByUserId(currentUser.getId());
        return subscriptions.stream()
                            .map(this::convertToResponse)
                            .collect(Collectors.toList());
    }

    /**
     * Subscribes the currently authenticated user to a theme.
     * 
     * @param request The {@link SubscriptionRequest} containing the theme ID to subscribe to.
     * @return The created {@link Subscription} entity.
     */
    public Subscription subscribe(SubscriptionRequest request) {
        currentUser = this.userService.getCurrentUser();
        Theme theme = this.themeService.findById(request.getTheme_id()).orElse(null);
        Subscription subscription = new Subscription()
            .setUser(currentUser)
            .setTheme(theme);
        return this.subscriptionRepository.save(subscription);
    }

    /**
     * Unsubscribes the currently authenticated user from a theme based on the subscription ID.
     * 
     * @param request The {@link UnsubscriptionRequest} containing the subscription ID to unsubscribe from.
     */
    public void unsubscribe(UnsubscriptionRequest request) {
        Subscription subscription = this.subscriptionRepository.findById(request.getId()).orElse(null);
        if (subscription != null) {
            this.subscriptionRepository.delete(subscription);
        }
    }

    /**
     * Converts a {@link Subscription} entity to a {@link SubscriptionResponse} data transfer object.
     * 
     * @param subscription The {@link Subscription} entity to be converted.
     * @return The corresponding {@link SubscriptionResponse} data transfer object.
     */
    public SubscriptionResponse convertToResponse(Subscription subscription) {
        SubscriptionResponse response = new SubscriptionResponse();
        response.setId(subscription.getId());
        response.setTheme_id(subscription.getTheme().getId());
        response.setUser_id(subscription.getUser().getId());
        response.setCreatedAt(subscription.getCreatedAt());
        return response;
    }
}
