kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

loadSprite("wall-steel", "./sprites/wall.png");
loadSprite("wall-brick", "./sprites/brick.png");
loadSprite("door", "./sprites/door.png");
loadSprite("explosion", "./sprites/explosion.png");
loadSprite("brick-wood", "./sprites/wood.png");
loadSprite("wall-gold", "./sprites/gold.png");
loadSprite("bg", "./sprites/bg.png");

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");

  const maps = [
    [
      "aaaaaaaaaaaaaaa",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "a             a",
      "aaaaaaaaaaaaaaa",
    ],
  ];

  const levelsCfg = {
    width: 26,
    height: 26,
    a: () => [sprite("wall-steel"), "wall-steel", area(), solid(), "wall"],
    z: () => [sprite("brick-red"), "wall-brick", area(), solid(), "wall"],
    d: () => [sprite("brick-red"), "wall-brick-door", area(), solid(), "wall"],
    b: () => [sprite("wall-gold"), "wall-gold", area(), solid(), "wall"],
    w: () => [sprite("brick-wood"), "wall-brick", area(), solid(), "wall"],
    p: () => [sprite("brick-wood"), "wall-brick-door", area(), solid(), "wall"],
    t: () => [sprite("door"), "door", "wall"],
  };

  const gameLevel = addLevel(maps[0], levelsCfg);
});

go("game");
