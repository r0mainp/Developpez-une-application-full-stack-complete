package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.payload.request.UnsubscriptionRequest;
import com.openclassrooms.mddapi.payload.response.GenericResponse;
import com.openclassrooms.mddapi.payload.response.SubscriptionResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;

@RestController
@RequestMapping("api/subscription")
public class SubscriptionController {

    @Autowired
    SubscriptionService subscriptionService;

    @GetMapping("/")
    public ResponseEntity<List<SubscriptionResponse>> getCurrentUserSubscriptions(){
        List<SubscriptionResponse> subscriptions = this.subscriptionService.getCurrentUserSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<GenericResponse> subscribe(@RequestBody SubscriptionRequest request){
        try{
            this.subscriptionService.subscribe(request);
            GenericResponse response = new GenericResponse("Vous vous êtes abonné");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            GenericResponse response = new GenericResponse("Erreur"+ e);
           return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<GenericResponse> unsubscribe(@RequestBody UnsubscriptionRequest request){
        try{
            this.subscriptionService.unsubscribe(request);
            GenericResponse response = new GenericResponse("Vous vous êtes désabonné");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            GenericResponse response = new GenericResponse("Erreur"+ e);
           return ResponseEntity.ok(response);
        }
    }
}
