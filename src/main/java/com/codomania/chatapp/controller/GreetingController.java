package com.codomania.chatapp.controller;

import com.codomania.chatapp.model.Greeting;
import com.codomania.chatapp.model.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
        return new Greeting(HtmlUtils.htmlEscape(message.getMessage()),HtmlUtils.htmlEscape(message.getFrom()));
    }

    @MessageMapping("/connect")
    @SendTo("/topic/connected")
    public HelloMessage connect(HelloMessage message) throws Exception{

        HelloMessage helloMessage = new HelloMessage();
        helloMessage.setFrom(HtmlUtils.htmlEscape(message.getFrom()));
        return helloMessage;
    }

    @MessageMapping("/disconnect")
    @SendTo("/topic/disconnected")
    public HelloMessage disconnect(HelloMessage message) throws Exception{
        HelloMessage helloMessage = new HelloMessage();
        helloMessage.setFrom(message.getFrom());
        return helloMessage;
    }

}
