import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime, timedelta

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
        results = session.query(quake.Place, quake.Longitude, quake.Latitude, quake.Magnitude, quake.Converted_Time_GMT).all()
        session.close()

        return(f'Map')

# @app.route('/api/v1.0/Indonesia')
# def Indonesia():
#         session = Session(engine)
#         results = session.query(.date, measurement.prcp).all()

#         prcp_dates = []
#         for date, prcp in results:
#             prcp_dict = {}
#             prcp_dict["date"] = date
#             prcp_dict["prcp"] = prcp
#             prcp_dates.append(prcp_dict)

#         session.close()

#         return jsonify(prcp_dates)


if __name__ == '__main__':
    app.run(debug=True)
