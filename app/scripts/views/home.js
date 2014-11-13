define([
  'jquery',
  'underscore',
  'backbone', 
  'text!../templates/home.html'
], function ($, _, Backbone, home_template) {
  'use strict';
  var HomeView = Backbone.View.extend({
    el: '.content',
    home_template: _.template(home_template),
    events: {
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
      that.$el.append(that.home_template());
      $('.nav-button').removeClass('active');
      $('.nav-button.home').addClass('active');
      setTimeout(that.addTransition, 500); 
    },

    addTransition: function() {
      $('.div_content').addClass('movein');
    }
  });

  return HomeView;
});

