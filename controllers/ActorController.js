const { Actor, Movie } = require("../models/index");
const ActorController = {};

ActorController.create = (req, res) => {
  Actor.create({
    ...req.body,
  })
    .then((actor) => {
      res.send(actor);
    })
    .catch((error) => res.send(error));
};

ActorController.getActorByName = (req, res) => {
  Actor.findAll({
    where: {
      name: req.params.name,
    },
    include: [
      {
        model: Movie,
        as: "Movies",
        through: {
          attributes: [],
        },
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

ActorController.getActors = (req, res) => {
  Actor.findAll().then((data) => {
    res.send(data);
  });
};

ActorController.update = (req, res) => {
  let data = req.body;
  let id = req.params.id;
  Actor.update(data, {
    where: {
      id: id,
    },
  })
    .then((updated) => {
      res.send(updated);
    })
    .catch((error) => res.send(error));
};

ActorController.delete = async (req, res) => {
  try {
    await Actor.destroy({
      where: {},
      truncate: false,
    });
    res.send(`Se han eliminado todos los actores `);
  } catch (error) {
    res.send(error);
  }
};

module.exports = ActorController;
