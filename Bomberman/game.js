kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  background: [0, 0, 0, 1],
});

const MOVE_SPEED = 120;
const ENEMY_SPEED = 60;
let bombsNumber = 1;

//=================================================Loading Sprites=======================================================
loadSprite("wall-steel", "./sprites/wall.png");
loadSprite("brick-red", "./sprites/brick.png");
loadSprite("door", "./sprites/door.png");
loadSprite("brick-wood", "./sprites/wood.png");
loadSprite("wall-gold", "./sprites/gold.png");
loadSprite("bg", "./sprites/bg.png");

loadSprite("bomberman", "./sprites/player.png", {
  sliceX: 7,
  sliceY: 4,
  anims: {
    // idle
    idleLeft: { from: 21, to: 21 },
    idleRight: { from: 7, to: 7 },
    idleUp: { from: 0, to: 0 },
    idleDown: { from: 14, to: 14 },

    // move
    moveLeft: { from: 22, to: 27, loop: true },
    moveRight: { from: 8, to: 13, loop: true },
    moveUp: { from: 1, to: 6, loop: true },
    moveDown: { from: 15, to: 20, loop: true },
  },
});

loadSprite("bomb", "./sprites/bomb.png", {
  sliceX: 3,
  anims: { move: { from: 0, to: 2, loop: true } },
});

loadSprite("explosion", "./sprites/explosion.png", {
  sliceX: 5,
  sliceY: 5,
});
loadSprite("enemy1", "./sprites/Brown_Chicken.png", { sliceX: 1 });
loadSprite("enemy2", "./sprites/Brown_Chicken.png", { sliceX: 1 });
loadSprite("enemy3", "./sprites/Brown_Chicken.png", { sliceX: 1 });

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");

  const maps = [
    [
      "aaaaaaaaaaaaaaaaaaaaaaaaa",
      "aj                      a",
      "a a a a a a a a a a a a a",
      "a                       a",
      "a                   #   a",
      "a                       a",
      "a      %                a",
      "a                       a",
      "a                       a",
      "a            @          a",
      "a                       a",
      "a                       a",
      "a                       a",
      "a                       a",
      "aaaaaaaaaaaaaaaaaaaaaaaaa",

      // "aaaaaaaaaaaaaaa",
      // "aj            a",
      // "a a a a a a a a",
      // "a   %         a",
      // "a a a a a a#a a",
      // "a             a",
      // "a a a a a a a a",
      // "a             a",
      // "a a a a a a a a",
      // "a             a",
      // "a a a a a a a a",
      // "a   @         a",
      // "a a a a a a a a",
      // "a             a",
      // "aaaaaaaaaaaaaaa",
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
    j: () => [sprite("bomberman"), area(), solid(), "player", scale(1.0)],
    "#": () => [
      sprite("enemy2"),
      "ghost",
      "dangerous",
      area(),
      solid(),
      { dir: -1, time: 0 },
    ],
    "@": () => [
      sprite("enemy3"),
      "slime",
      "dangerous",
      area(),
      solid(),
      { dir: -1, time: 0 },
    ],
    "%": () => [
      sprite("enemy1"),
      "baloon",
      "dangerous",
      area(),
      solid(),
      { dir: -1, time: 0 },
    ],
  };

  const gameLevel = addLevel(maps[0], levelsCfg);

  add([sprite("bg"), layer("bg")]);

  const player = get("player")[0];

  player.previousDir = "down"; // not being used, could help avoid first key down after releasing second key not working
  player.direction = "down";
  player.currSprite = true;

  //  player movements
  onKeyDown("left", () => {
    //if (!isKeyDown("up") && !isKeyDown("down")) {
    if (player.direction === "left") {
      player.move(-MOVE_SPEED, 0);
      // h, v;
      // player.dir = vec2(-1, 0);
    }
  });

  onKeyDown("right", () => {
    //if (!isKeyDown("up") && !isKeyDown("down")) {
    if (player.direction === "right") {
      player.move(MOVE_SPEED, 0);
      // if (player.currSprite) {

      //   player.currSprite = false;
      // }
      // player.dir = vec2(1, 0);
    }
  });

  onKeyDown("up", () => {
    //if (!isKeyDown("left") && !isKeyDown("right")) {
    if (player.direction === "up") {
      player.move(0, -MOVE_SPEED);
      // player.dir = vec2(0, -1);
    }
  });

  onKeyDown("down", () => {
    //if (!isKeyDown("left") && !isKeyDown("right")) {
    if (player.direction === "down") {
      player.move(0, MOVE_SPEED);
      // player.dir = vec2(0, 1);
    }
  });

  //  player animations
  onKeyPress("left", () => {
    player.direction = "left";
    player.play("moveLeft");
  });

  onKeyPress("right", () => {
    player.direction = "right";
    player.play("moveRight");
    // if (player.currSprite) {
    //   player.play("moveRight");
    //   player.currSprite = false;
    // }
  });

  onKeyPress("up", () => {
    player.direction = "up";
    player.play("moveUp");
  });

  onKeyPress("down", () => {
    player.direction = "down";
    player.play("moveDown");
  });

  onKeyRelease(["left"], () => {
    if (!isKeyDown("up") && !isKeyDown("down") && !isKeyDown("right")) {
      player.play("idleLeft");
    }
  });

  onKeyRelease(["right"], () => {
    if (!isKeyDown("up") && !isKeyDown("down") && !isKeyDown("left")) {
      player.play("idleRight");
    }
  });

  onKeyRelease(["up"], () => {
    if (!isKeyDown("left") && !isKeyDown("down") && !isKeyDown("right")) {
      player.play("idleUp");
    }
  });

  onKeyRelease(["down"], () => {
    if (!isKeyDown("up") && !isKeyDown("left") && !isKeyDown("right")) {
      player.play("idleDown");
    }
  });

  onKeyPress("d", () => {
    spawnBomb(player.pos.add(player.gridPos.sub(0, 0)));
  });

  // enemies actions
  onUpdate("baloon", (s) => {
    // s.pushOutAll();
    s.move(s.dir * ENEMY_SPEED, 0);
    s.time -= dt();
    if (s.time <= 0) {
      // change direction
      s.dir = -s.dir;
      s.time = rand(5);
    }
  });

  onUpdate("slime", (s) => {
    s.move(s.dir * ENEMY_SPEED, 0);
    s.time -= dt();
    if (s.time <= 0) {
      s.dir = -s.dir;
      s.time = rand(15);
    }
  });

  onUpdate("ghost", (s) => {
    s.move(0, s.dir * ENEMY_SPEED);
    s.time -= dt();
    if (s.time <= 0) {
      s.dir = -s.dir;
      s.time = rand(5);
    }
  });

  player.onCollide("enemy1", (enemy) => {
    bombsNumber++;
  });

  //=================================================Functions=======================================================

  function spawnExplosion(p, frame) {
    const obj = add([
      sprite("explosion", {
        animeSpeed: 0.1,
        frame: frame,
      }),
      pos(p),
      scale(1.5),
      "explosion",
      area(),
      solid(),
    ]);

    wait(0.5, () => {
      destroy(obj);
    });
  }

  function spawnBomb(p) {
    if (bombsNumber > 0) {
      bombsNumber--;
      const obj = add([
        sprite("bomb"),
        "move",
        pos(p),
        scale(1.5),
        "bomb",
        solid(),
        area(),
      ]);
      // obj.pushOutAll();
      obj.play("move");

      wait(2, () => {
        destroy(obj);

        //center
        obj.dir = vec2(1, 0);
        spawnExplosion(obj.pos.add(obj.dir.scale(0)), 12);

        //up
        obj.dir = vec2(0, -1);
        spawnExplosion(obj.pos.add(obj.dir.scale(20)), 2);

        //down
        obj.dir = vec2(0, 1);
        spawnExplosion(obj.pos.add(obj.dir.scale(20)), 22);

        //left
        obj.dir = vec2(-1, 0);
        spawnExplosion(obj.pos.add(obj.dir.scale(20)), 10);

        //right
        obj.dir = vec2(1, 0);
        spawnExplosion(obj.pos.add(obj.dir.scale(20)), 14);

        bombsNumber++;
      });
    } else {
      return;
    }
  }
});

go("game");
