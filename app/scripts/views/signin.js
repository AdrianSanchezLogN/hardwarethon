define([
  'text!../templates/signin.html'
], function (signin_template) {
  'use strict';
  var SigninView = Backbone.View.extend({
    el: '.content',
    signin_template: _.template(signin_template),
    events: {
        'submit form': 'signin',
    },

    initialize: function (options) {
        // ---------------------------------
        // Add the options as part of the instance
        //_.extend(this, options);
    },

    render: function() {  
      $('.div_content').removeClass('movein');
      setTimeout(this.renderMain, 1000, this); 
    },

    renderMain: function(that) {       
      that.$el.html('').hide().fadeIn().slideDown('slow');
      that.$el.append(that.signin_template());
      $('.nav-button').removeClass('active');
      $('.nav-button.signin').addClass('active');
      setTimeout(that.addTransition, 500); 
    },

    signin: function(event) {
        event.preventDefault();
        $.post('email', {'email':$('#inputEmail1').val(), 'name':$('#text1').val()});
        $('.alert-success').removeClass('hidden');
        $('#inputEmail1').val('');
        $('#text1').val('');
        setTimeout(this.addHidden, 2000, '.alert-success');
    },

    addTransition: function() {
      $('.div_content').addClass('movein');
    },

    addHidden: function(msg_class) {
      $(msg_class).addClass('hidden');
    }
  });

  return SigninView;
});

