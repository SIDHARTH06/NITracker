module.exports = {
    routes: [
      {
        // Path defined with an URL parameter
        method: "GET",
        path: "/lost-items/all",
        handler: "lost-item.findAll",
      },
      {
        // Path defined with an URL parameter
        method: "GET",
        path: "/lost-items/:id",
        handler: "lost-item.findSpec",
      },
     
     
    ],
  };
  