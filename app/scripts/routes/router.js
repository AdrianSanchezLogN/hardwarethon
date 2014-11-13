/*global define*/
define([
  'jquery',
  'backbone',
  'views/signin',
  'views/header',
  'views/home',
  'views/labs',
  'views/event',
  'views/awards',
], function ($, Backbone, signInView, headerView, homeView, labsInView, eventView, awardsView) {
  'use strict';

  var SignInView = new signInView(),
	  HeaderView = new headerView(),
	  HomeView = new homeView(),
	  LabsInView = new labsInView(),
	  EventView = new eventView(),
	  AwardsView = new awardsView(),
    Router = Backbone.Router.extend({
      routes: {
          '':     'home',
          'home': 'home',
          'signin': 'signin',
          'labs': 'labs',
          'event': 'event',
          'awards': 'awards'
      },

      initialize: function() {
      },

      home: function() {
          HeaderView.render();
          HomeView.render();
          window.location = '#home';
      },

      signin: function() {
          HeaderView.render();
          SignInView.render();
          window.location = '#signin';
      },

      labs: function() {
          HeaderView.render();
          LabsInView.render();
          window.location = '#labs';
      },

      event: function() {
          HeaderView.render();
          EventView.render();
          window.location = '#event';
      },

      awards: function() {
          HeaderView.render();
          AwardsView.render();
          window.location = '#awards';
      }
  });
  return Router;
});


