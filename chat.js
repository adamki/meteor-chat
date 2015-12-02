ChatMessages = new Mongo.Collection('chatmessages');

  if (Meteor.isClient) {
    Template.messageBox.events({
      'click #sendMessage, keydown #myMessage':
      function(event, template){
        if (!event.keyCode || event.keyCode == 13 ){
          event.preventDefault();
          enterMessage();
          console.log("clicked it!");
        }
      },
    });

    Template.clearMessages.events({
      'click #clearAllMessages': function(e, t){
        Meteor.call('removeMessages');
      }
    });

    function enterMessage(newMessage){
      var newMessage = $('#myMessage').val();
      console.log(newMessage);
      ChatMessages.insert({
        message: newMessage,
        timestamp: new Date()
      });
      $('#myMessage').val('');
    }

  Template.chatMessages.helpers({
    'allMessages': function(){
      return ChatMessages.find({},{sort: {
        timestamp: -1 }});
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'removeMessages': function(){
      ChatMessages.remove({});
    }
  });
}
