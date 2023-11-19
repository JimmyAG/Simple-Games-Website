# Simple games website

![Flask logo](/static/flask-icon.png)![Javascript logo](/static/js-logo.png)

The project is for the EPFL extension school "Thinking and creating with code"

This is a full website with a native JS frontend and backend in Flask <br>
No database!

The two available games are two recreations of my beloved games: Minesweeper and Tic Tac Toe

I will be rewriting the front end using React soon.

---

Requirements

-   Python 3
-   Flask framework

## Initial setup

Clone the repo, then change into the directory where main.py exists and run the following commands to start the dev server

```bash
flask --app main.py run
```

to run the server in debug mode add the
`--debug flag`

```bash
flask --app main.py run --debug
```

the server will be running on localhost port 5000

| server | URL                   |
| ------ | --------------------- |
| flask  | http://localhost:5000 |

checking winner in Tic Tac Toe wasn't implemented!
