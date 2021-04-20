import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime, timedelta

from flask import Flask, jsonify

database_path = 'test.db'
engine = create_engine(f'sqlite:///{database_path}')
Base = automap_base()
Base.prepare(engine, reflect=True)
quake = Base.classes.quake
session = Session(engine)

app = Flask(__name__)

@app.route("/")
def home():
    print("Map")
    session = Session(engine)
    results = session.query(measurement.Longitude, quake.Latitude).all()
    session.close()

    return(f'Map')





if __name__ == '__main__':
    app.run(debug=True)