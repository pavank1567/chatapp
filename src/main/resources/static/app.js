const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
//    $("#greetings").append("<tr><td>"+ username + "joined");
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content, JSON.parse(greeting.body).sender);
    });
    stompClient.subscribe('/topic/connected', (message) => {
        console.log("MESSAGE :::: ", message)
        connectedAlert(JSON.parse(message.body).from);
    });
    stompClient.subscribe('/topic/disconnected', (message) => {
        disconnectedAlert(JSON.parse(message.body).from);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        stompClient.publish({
                destination: "/app/connect",
                body: JSON.stringify({'from': $("#username").val()})
            });
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connectedAlert(username){
        $("#greetings").append("<div class='alert alert-success text-center' role='alert'>" + username + " Joined"+"</div>");
}
function disconnectedAlert(username){
        $("#greetings").append("<div class='alert alert-danger text-center' role='alert'>" + username + " Left"+"</div>");
}

function connect() {

    var username = $('#username').val();
    console.log("username", username);

    localStorage.setItem('username', username);
    stompClient.activate();
//    $("#greetings").append("<tr><td>" + username + "Joined");

}

function disconnect() {
     stompClient.publish({
        destination: "/app/disconnect",
        body: JSON.stringify({'from': $("#username").val()})
    });
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'from': $("#username").val(), 'message': $("#message").val()})
    });
}

function showGreeting(message, from) {
    $("#greetings").append("<tr><td>" + "<span class='text-start bg-primary p-2'>" + from + "</span>"  + "<p class='p-2 display-6'>" + message + "</p>" + "</td></tr>");
//    $("#greetingsfrom").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});