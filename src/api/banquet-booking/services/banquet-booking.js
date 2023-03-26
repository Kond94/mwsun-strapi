'use strict';

/**
 * banquet-booking service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::banquet-booking.banquet-booking');
