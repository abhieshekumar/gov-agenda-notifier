const express = require('express');
const passport = require('passport');
const getAuthController = require('../controllers/authController');

module.exports = (logger, dbClient) => {
  const authController = getAuthController(logger, dbClient);
  const router = express.Router({ mergeParams: true });

  router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.route('/google/callback').get(
    passport.authenticate('google',
      { failureRedirect: '/failed' }),
    authController.googleCallback,
  );
  router.route('/failed').get(authController.logginFailed);
  router.route('/good').get(passport.authenticate('jwt', { session: false }), authController.logginSuccess);
  router.route('/logout').get(authController.logout);

  return router;
};
