kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");

  loadSprite("wall", "./sprites/wall.png");
  loadSprite("brick", "./sprites/brick.png");
  loadSprite("door", "./sprites/door.png");
  loadSprite("explosion", "./sprites/explosion.png");
  loadSprite("wood", "./sprites/wood.png");
  loadSprite("gold", "./sprites/gold.png");
  loadSprite("bg", "./sprites/bg.png");
});

go("game");
