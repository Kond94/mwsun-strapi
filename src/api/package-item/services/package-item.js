'use strict';

/**
 * package-item service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::package-item.package-item');
