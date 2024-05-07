package com.codomania.chatapp.model;

public class Greeting {

    private String content;

    private String sender;

    public Greeting() {
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Greeting(String content) {
        this.content = content;
    }

    public Greeting(String content, String sender) {
        this.content = content;
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

}