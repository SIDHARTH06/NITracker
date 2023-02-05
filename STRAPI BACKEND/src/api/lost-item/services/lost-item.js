'use strict';

/**
 * lost-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lost-item.lost-item');
