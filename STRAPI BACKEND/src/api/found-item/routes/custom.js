module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/found-items/all",
      handler: "found-item.findAll",
    },
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/found-items/:id",
      handler: "found-item.findSpec",
    },
   
   
  ],
};
