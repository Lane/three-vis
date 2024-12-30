Empty grid:

```
  1 2 3 4 5 6 7 8
1 o o o o o o o o
2 o o o o o o o o
3 o o o o o o o o
4 o o o o o o o o
5 o o o o o o o o
6 o o o o o o o o
7 o o o o o o o o
8 o o o o o o o o
```

A grid of arrows representing the direction the next point will be drawn:

```
  1 2 3 4 5 6 7 8
1 > > > > > > > v
2 ^ > > > > > v v
3 ^ ^ > > > v v v
4 ^ ^ ^ > v v v v
5 ^ ^ ^ < < v v v
6 ^ ^ < < < < v v
7 ^ < < < < < < v
8 x < < < < < < <
```

An array of points indicating the order points will be drawn and the direction of the next point [x, y, direction]:

```
[
  [4, 4, "none"],
  [4, 5, "right"],
  [5, 5, "down"],
  [5, 4, "left"],
  [5, 3, "left"],
  [4, 3, "up"],
  [3, 3, "up"],
  [3, 4, "right"],
  [3, 5, "right"],
  [3, 6, "right"],
  [4, 6, "down"],
  [5, 6, "down"],
  [6, 6, "down"],
  [6, 5, "left"],
  [6, 4, "left"],
  [6, 3, "left"],
  [6, 2, "left"],
  [5, 2, "up"],
  [4, 2, "up"],
  [3, 2, "up"],
  [2, 2, "up"],
  [2, 3, "right"],
  [2, 4, "right"],
  [2, 5, "right"],
  [2, 6, "right"],
  [2, 7, "right"],
  [3, 7, "down"],
  [4, 7, "down"],
  [5, 7, "down"],
  [6, 7, "down"],
  [7, 7, "down"],
  [7, 6, "left"],
  [7, 5, "left"],
  [7, 4, "left"],
  [7, 3, "left"],
  [7, 2, "left"],
  [7, 1, "left"],
  [6, 1, "up"],
  [5, 1, "up"],
  [4, 1, "up"],
  [3, 1, "up"],
  [2, 1, "up"],
  [1, 1, "up"],
  [1, 2, "right"],
  [1, 3, "right"],
  [1, 4, "right"],
  [1, 5, "right"],
  [1, 6, "right"],
  [1, 7, "right"],
  [1, 8, "right"],
  [2, 8, "down"],
  [3, 8, "down"],
  [4, 8, "down"],
  [5, 8, "down"],
  [6, 8, "down"],
  [7, 8, "down"],
  [8, 8, "down"],
  [8, 7, "left"],
  [8, 6, "left"],
  [8, 5, "left"],
  [8, 4, "left"],
  [8, 3, "left"],
  [8, 2, "left"],
  [8, 1, "left"]
]
```


[
  "r",
  "d",
  "l",
  "l",
  "u",
  "u",
  "r",
  "r",
  "r",
  "d",
  "d",
  "d",
  "l",
  "l",
  "l",
  "l",
  "u",
  "u",
  "u",
  "u",
  "r",
  "r",
  "r",
  "r",
  "r",
  "d",
  "d",
  "d",
  "d",
  "d",
  "l",
  "l",
  "l",
  "l",
  "l",
  "l",
  "u",
  "u",
  "u",
  "u",
  "u",
  "u",
  "r",
  "r",
  "r",
  "r",
  "r",
  "r",
  "r",
  "d",
  "d",
  "d",
  "d",
  "d",
  "d",
  "d",
  "l",
  "l",
  "l",
  "l",
  "l",
  "l",
  "l",
  "l"
]