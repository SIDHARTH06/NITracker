"use strict";

/**
 * found-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::found-item.found-item",
  ({ strapi }) => ({
    async findAll(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::found-item.found-item",
        {
          populate: { user: true ,image:true,found_tags:true},
        }
      );
      return entries;
    },
    async findSpec(ctx) {
      const entries = await strapi.entityService.findOne(
        "api::found-item.found-item",
        ctx.params.id,
        {
          populate: { user: true ,
        image: true,
        found_tags: true,
        },
        }
      );
      return entries;
    },
  })
);
