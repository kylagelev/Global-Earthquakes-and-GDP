from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_usgs


app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/tremors_app"
mongo = PyMongo(app)

# set routes for website
@app.route("/")
def home():

    # find one record of mars info
    quake_info = mongo.db.collection.find_one()

    return render_template("top5.html", quake_info=quake_info)


# setup scrape route
@app.route("/scrape")
def scrape():
   
    quake_data = scrape_usgs.scrape()
    

    mongo.db.collection.update({}, quake_data, upsert=True)

    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)