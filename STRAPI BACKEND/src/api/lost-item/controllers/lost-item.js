"use strict";

/**
 * found-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::lost-item.lost-item",
  ({ strapi }) => ({
    async findAll(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::lost-item.lost-item",
        {
          populate: { user: true ,lost_tags:true,image:true},
        }
      );
      return entries;
    },
    async findSpec(ctx) {
      const entries = await strapi.entityService.findOne(
        "api::lost-item.lost-item",
        ctx.params.id,
        {
          populate: { user: true ,
        image: true,
        lost_tags: true,
        },
        }
      );
      return entries;
    },
  })
);
