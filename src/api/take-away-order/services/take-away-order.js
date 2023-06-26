'use strict';

/**
 * take-away-order service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::take-away-order.take-away-order');
