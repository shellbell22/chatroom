$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var numberconnected = $('#numberconnected');
    var showtyping = $('#showtyping');
    var isTyping = false;

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        var message = input.val();
        if (message.length > 0) {
          isTyping = true;
        }
        else {
          isTyping = false;
        }
        socket.emit('showtyping', isTyping);
        if (event.keyCode != 13) {
            isTyping = false;
            return;
        }

        addMessage(message);
        socket.emit('message', message);
        socket.emit('showtyping', false);
        input.val('');
    });

    socket.on('message', addMessage);

    socket.on('updatecounter', function(number) {
      numberconnected.html('Number currently connected: ' + number);
    });

    socket.on('showtyping', function(isTyping) {
      if(isTyping) {
      showtyping.html('User is typing');
    }
      else {
        showtyping.html(' ');
      }
    });


});
