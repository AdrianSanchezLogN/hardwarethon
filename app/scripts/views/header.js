define([
  'jquery',
  'underscore',
  'backbone', 
  'text!../templates/header.html'
], function ($, _, Backbone, header_template) {
  'use strict';
  var HeaderView = Backbone.View.extend({
    el: '.header',
    shown: false,
    header_template: _.template(header_template),
    events: {
    },

    initialize: function (options) {
        // ---------------------------------
        // Add the options as part of the instance
        //_.extend(this, options);
    },

    render: function() {
      if(! this.shown){
        this.$el.html('').hide().fadeIn().slideDown('slow');
        this.$el.append(this.header_template());
        this.shown = true;
      }
    }
  });

  return HeaderView;
});

