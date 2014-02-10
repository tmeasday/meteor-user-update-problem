if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to user-update-problem.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    createUsers: function() {
      _.times(10 * 1000, function(i) {
        if (i % 100 === 0) console.log('Up to ' + i);
        Accounts.createUser({username: Random.id()});
      });
    },
    
    timeUpdates: function() {
      var userId = Meteor.users.findOne()._id;
      var start = new Date;
      _.times(100, function() {
        Meteor.users.update({_id: userId}, {$inc: {'profile.updateCount': 1}});
      });
      console.log('It took ' + (new Date - start) / 1000 + 's');
    }
  })
}
