'use strict';

/**
 * conference-booking service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::conference-booking.conference-booking');
