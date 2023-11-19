import flask  
from database import Database


app = flask.Flask(__name__)
app.secret_key = "#We%KJn`~aIM5M3s2"


@app.route("/")
def home():
    try:
        if flask.session["logged_in"] :
            username = flask.session["username"]
            return flask.render_template("index.htm", current_user = username, stylesheet = "/static/style.css")
    except:
        return flask.render_template("index.htm", stylesheet = "/static/style.css")


@app.route("/stats")
def stats():
    try:
        if flask.session["logged_in"] :
            username = flask.session["username"]
            return flask.render_template("stats.htm", current_user = username, stylesheet = "/static/stats/stats.css")
    except:
        return flask.render_template("stats.htm", stylesheet = "/static/stats/stats.css")



"""This section manages login/signup and logout """
#############################################
#signup
@app.route("/sign_up", methods = ["GET", "POST"])
def sign_up():
    
    if flask.request.method == "POST":
        username = flask.request.form["signup_username"]
        password = flask.request.form["signup_password"]
        db = Database(username, password)

        
        if username.strip() == "" and password.strip() == "":
            message = "Please enter a username and password"
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")

        elif username == "":
            message = "Please enter a username"
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")
        
        elif " " in username:
            message = "Username should not contain empty spaces"
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")
        
        elif len(password) == 0:
            message = "Passwords can't be empty!"
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")
        
        elif len(password) < 8:
            message = "Passwords should be at least 8 characters long!"
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")

        elif len(password) >= 8 and username.strip() != "":
            db = Database(username.strip().replace(" ", "_"), password)
            message = db.sign_up()
            return flask.render_template("sign_up.htm", message = message, stylesheet = "/static/signup/sign_up.css")



    return flask.render_template("sign_up.htm", stylesheet = "static/signup/sign_up.css")


#log in
@app.route("/log_in", methods = ["Get", "POST"])
def log_in():

    if flask.request.method == "POST":
        username = flask.request.form["login_username"]
        password = flask.request.form["login_password"]
        db = Database(username, password)
        result = db.log_in(username, password)
        
        if username == "":
            message = "Please enter your username"
            return flask.render_template("log_in.htm", message = message,  stylesheet = "/static/login/log_in.css")

        elif password == "":
            message = "Please enter your password"
            return flask.render_template("log_in.htm", message = message,  stylesheet = "/static/login/log_in.css")

        
        if result == True:
            flask.session["logged_in"] = True
            flask.session["username"] = username

            return flask.render_template("index.htm", current_user = username, stylesheet = "/static/style.css")
        else:
            message = result
            return flask.render_template("log_in.htm", message = message, stylesheet = "/static/login/log_in.css")


    return flask.render_template("log_in.htm", stylesheet = "/static/login/log_in.css")



#Logs out the current user and redirects him back to the login page    
@app.route("/log_out", methods = ["GET", "POST"])
def log_out():
    flask.session.pop("logged_in", None)

    return flask.render_template("index.htm")



#Go to Minesweeper page
@app.route("/minesweeper",  methods = ["GET", "POST"])
def minesweeper():
    try: 
        if flask.session["logged_in"]:
            username = flask.session["username"]
            return flask.render_template("minesweeper.htm", current_user = username, stylesheet = "/static/minesweeper/minesweeper.css")
    except:
        return flask.render_template("minesweeper.htm", stylesheet = "/static/minesweeper/minesweeper.css")




#Go to Minesweeper page
@app.route("/tic-tac-toe")
def tic_tac_toe():
    return flask.render_template("tic-tac-toe.htm", stylesheet = "/static/tic-tac-toe/tic-tac-toe.css")


@app.route("/games")
def games():
    return flask.render_template("games.htm", stylesheet = "/static/games/games.css")
