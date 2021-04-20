import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

database_path = 'updated_earthquake.db'
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
