AutoForm.hooks({
  updateSettingsForm: {
    onSuccess: function(formType, result) {
      if (result) {
        Bert.alert('Updated successfully', 'success');
        Meteor.call("settingsUpdate");
      }
      this.event.preventDefault();
      return false;
    },
    onError: function(formType, error) {
      console.log(error);
      Bert.alert('Update failed, please try again', 'danger');
    }
  }
});

Template.admin.helpers({
  settings: function(){
    return Settings.findOne({});
  },
  branch: function () {
    return Template.instance().branch.get();
  },
  update: function () {
    return Template.instance().update.get();
  }
});

Template.admin.onCreated(function(){
  var instance = this;
  instance.branch = new ReactiveVar("");
  instance.update = new ReactiveVar(false);

  Meteor.call("getBranch", function (error, result) {
    if (result) {
      instance.branch.set(result);
    }
  });

  Meteor.call("checkForUpdate", function (error, result) {
    if (result) {
      instance.update.set(result)
    }
  });

});

Template.admin.events({
  'show.bs.collapse .panel' : function (event, template) {
    console.log($(event.target));
    $(event.target).parent().removeClass("panel-default")
    $(event.target).parent().addClass("panel-primary")
  },
  'hide.bs.collapse .panel' : function (event, template) {
    $(event.target).parent().removeClass("panel-primary")
    $(event.target).parent().addClass("panel-default")
  },
  'submit #updateSettingsForm' : function (event) {
    event.preventDefault();
    return false;
  },
  'click #couchPotatoTest' : function (event) {
    event.preventDefault();
    var btn = $(event.target);
    btn.html("Testing... <i class='fa fa-spin fa-refresh'></i>").removeClass().addClass("btn btn-info-outline");
    Meteor.call("testCouchPotato", function (error, result) {
      if (error || !result) {
        btn.removeClass("btn-info-outline").addClass("btn-danger-outline");
        btn.html("Error!");
      } else {
        btn.removeClass("btn-info-outline").addClass("btn-success-outline");
        btn.html("Success!");
      }
    })
  },
  'click #sickRageTest' : function (event) {
    event.preventDefault();
    var btn = $(event.target);
    btn.html("Testing... <i class='fa fa-spin fa-refresh'></i>").removeClass().addClass("btn btn-info-outline");
    Meteor.call("testSickRage", function (error, result) {
      if (error || !result) {
        btn.removeClass("btn-info-outline").addClass("btn-danger-outline");
        btn.html("Error!");
      } else {
        btn.removeClass("btn-info-outline").addClass("btn-success-outline");
        btn.html("Success!");
      }
    })
  },
  'click #pushbulletTest' : function (event) {
    event.preventDefault();
    var btn = $(event.target);
    btn.html("Testing... <i class='fa fa-spin fa-refresh'></i>").removeClass().addClass("btn btn-info-outline");
    Meteor.call("testPushbulllet", function (error, result) {
      if (error || !result) {
        btn.removeClass("btn-info-outline").addClass("btn-danger-outline");
        btn.html("Error!");
        Bert.alert(error.reason, "danger");
      } else if (result) {
        btn.removeClass("btn-info-outline").addClass("btn-success-outline");
        btn.html("Success!");
      }
    })
  },
  'click #pushoverTest' : function (event) {
    event.preventDefault();
    var btn = $(event.target);
    btn.html("Testing... <i class='fa fa-spin fa-refresh'></i>").removeClass().addClass("btn btn-info-outline");
    Meteor.call("testPushover", function (error, result) {
      if (error || !result) {
        btn.removeClass("btn-info-outline").addClass("btn-danger-outline");
        btn.html("Error!");
        Bert.alert(error.reason, "danger");
      } else if (result) {
        btn.removeClass("btn-info-outline").addClass("btn-success-outline");
        btn.html("Success!");
      }
    })
  },
  'click #plexsubmit' : function (event) {
    event.preventDefault();
    $('#plexsubmit').html("Getting Token... <i class='fa fa-spin fa-refresh'></i>");
    var username = $('#plexuser').val();
    var password = $('#plexpassword').val();
    Meteor.call("getPlexToken", username, password, function (error, result) {
      if (error) {
        $("#plexsubmit").html('Get token <i class="fa fa-key"></i>');
        Bert.alert(error.reason, "danger");
      } else if (result) {
        $("#plexsubmit").html('Get token <i class="fa fa-key"></i>');
        Bert.alert("Successfully got token!", "success");
      }
    })
    return false;
  }
});
