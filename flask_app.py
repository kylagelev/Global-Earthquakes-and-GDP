import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime, timedelta

from flask import Flask, jsonify, render_template

database_path = 'updated_earthquake.db'
engine = create_engine(f'sqlite:///{database_path}')
Base = automap_base()
Base.prepare(engine, reflect=True)
quake = Base.classes.quake
gdp = Base.classes.gdp
gdp_bra = Base.classes.gdp_bra
gdp_chl = Base.classes.gdp_chl
gdp_chn = Base.classes.gdp_chn
gdp_gbr = Base.classes.gdp_gbr
gdp_idn = Base.classes.gdp_idn
gdp_ind = Base.classes.gdp_ind
gdp_jpn = Base.classes.gdp_jpn
gdp_rus = Base.classes.gdp_rus
gdp_usa = Base.classes.gdp_usa

session = Session(engine)

app = Flask(__name__)


@app.route("/")
def home():

        return render_template('index.html')

@app.route("/api/v1.0/CHL_comp")
def CHL_comp():
        
        return render_template('CHL_comp.html')

@app.route("/api/v1.0/CHL10")
def CHL10():
        
        return render_template('CHL10.html')

@app.route("/api/v1.0/depth")
def depth():
        
        return render_template('depth.html')

@app.route("/api/v1.0/heat_map")
def heat_map():
        
        return render_template('heat_map.html')

@app.route("/api/v1.0/IND_comp")
def IND_comp():
        
        return render_template('IND_comp.html')

@app.route("/api/v1.0/IND04")
def IND04():
        
        return render_template('IND04.html')

@app.route("/api/v1.0/IND05")
def IND05():
        
        return render_template('IND05.html')

@app.route("/api/v1.0/IND12")
def IND12():
        
        return render_template('IND12.html')

@app.route("/api/v1.0/JPN11")
def JPN11():
        
        return render_template('JPN11.html')

@app.route("/api/v1.0/top5")
def top5():
        
        return render_template('top5.html')

@app.route("/api/v1.0/all_data")
def all_data():

        return (f"Welcome to the Data of Global Earthquakes and GDP.<br/><br/>"
                "Available Routes:<br/>" 
                "/api/v1.0/get_GDP <br/>"
                "/api/v1.0/get_GDP_BRA<br/>"
                "/api/v1.0/get_GDP_CHL<br/>"
                "/api/v1.0/get_GDP_CHN<br/>"
                "/api/v1.0/get_GDP_GBR<br/>"
                "/api/v1.0/get_GDP_IDN<br/>"
                "/api/v1.0/get_GDP_IND<br/>"
                "/api/v1.0/get_GDP_JPN<br/>"
                "/api/v1.0/get_GDP_RUS<br/>"
                "/api/v1.0/get_GDP_USA<br/>"
                "/api/v1.0/get_quake<br/>")

@app.route('/api/v1.0/get_GDP')
def get_GDP():
        session = Session(engine)
        results = session.query(gdp.Series_Name, 
                                gdp.Series_Code, 
                                gdp.Country_Name,
                                gdp.Country_Code, 
                                gdp.YearZero, 
                                gdp.YearOne, 
                                gdp.YearTwo, 
                                gdp.YearThree,
                                gdp.YearFour,
                                gdp.YearFive,
                                gdp.YearSix,
                                gdp.YearSeven,
                                gdp.YearEight,
                                gdp.YearNine,
                                gdp.YearTen,
                                gdp.YearEleven,
                                gdp.YearTwelve,
                                gdp.YearThirteen,
                                gdp.YearFourteen,
                                gdp.YearFifteen,
                                gdp.YearSixteen,
                                gdp.YearSeventeen,
                                gdp.YearEighteen,
                                gdp.YearNineteen
                                ).all()
        session.close()
        jsongdp = jsonify(results)
        return(jsongdp)

@app.route('/api/v1.0/get_GDP_BRA')
def get_GDP_BRA():
        session = Session(engine)
        results = session.query(gdp_bra.Year, 
                                gdp_bra.GDPgrowth, 
                                gdp_bra.GDP,
                                gdp_bra.GDPpercapita
                                ).all()
        session.close()
        jsongdp_bra = jsonify(results)
        return(jsongdp_bra)

@app.route('/api/v1.0/get_GDP_CHL')
def get_GDP_CHL():
        session = Session(engine)
        results = session.query(gdp_chl.Year, 
                                gdp_chl.GDPgrowth, 
                                gdp_chl.GDP,
                                gdp_chl.GDPpercapita
                                ).all()
        session.close()
        jsongdp_chl = jsonify(results)
        return(jsongdp_chl)

@app.route('/api/v1.0/get_GDP_CHN')
def get_GDP_CHN():
        session = Session(engine)
        results = session.query(gdp_chn.Year, 
                                gdp_chn.GDPgrowth, 
                                gdp_chn.GDP,
                                gdp_chn.GDPpercapita
                                ).all()
        session.close()
        jsongdp_chn = jsonify(results)
        return(jsongdp_chn)

@app.route('/api/v1.0/get_GDP_GBR')
def get_GDP_GBR():
        session = Session(engine)
        results = session.query(gdp_gbr.Year, 
                                gdp_gbr.GDPgrowth, 
                                gdp_gbr.GDP,
                                gdp_gbr.GDPpercapita
                                ).all()
        session.close()
        jsongdp_gbr = jsonify(results)
        return(jsongdp_gbr)

@app.route('/api/v1.0/get_GDP_IDN')
def get_GDP_IDN():
        session = Session(engine)
        results = session.query(gdp_idn.Year, 
                                gdp_idn.GDPgrowth, 
                                gdp_idn.GDP,
                                gdp_idn.GDPpercapita
                                ).all()
        session.close()
        jsongdp_idn = jsonify(results)
        return(jsongdp_idn)

@app.route('/api/v1.0/get_GDP_IND')
def get_GDP_IND():
        session = Session(engine)
        results = session.query(gdp_ind.Year, 
                                gdp_ind.GDPgrowth, 
                                gdp_ind.GDP,
                                gdp_ind.GDPpercapita
                                ).all()
        session.close()
        jsongdp_ind = jsonify(results)
        return(jsongdp_ind)

@app.route('/api/v1.0/get_GDP_JPN')
def get_GDP_JPN():
        session = Session(engine)
        results = session.query(gdp_jpn.Year, 
                                gdp_jpn.GDPgrowth, 
                                gdp_jpn.GDP,
                                gdp_jpn.GDPpercapita
                                ).all()
        session.close()
        jsongdp_jpn = jsonify(results)
        return(jsongdp_jpn)

@app.route('/api/v1.0/get_GDP_RUS')
def get_GDP_RUS():
        session = Session(engine)
        results = session.query(gdp_rus.Year, 
                                gdp_rus.GDPgrowth, 
                                gdp_rus.GDP,
                                gdp_rus.GDPpercapita
                                ).all()
        session.close()
        jsongdp_rus = jsonify(results)
        return(jsongdp_rus)

@app.route('/api/v1.0/get_GDP_USA')
def get_GDP_USA():
        session = Session(engine)
        results = session.query(gdp_usa.Year, 
                                gdp_usa.GDPgrowth, 
                                gdp_usa.GDP,
                                gdp_usa.GDPpercapita
                                ).all()
        session.close()
        jsongdp_usa = jsonify(results)
        return(jsongdp_usa)

@app.route('/api/v1.0/get_quake')
def get_quake():
        session = Session(engine)
        results = session.query(quake.Time, 
                                quake.Longitude, 
                                quake.Latitude, 
                                quake.Alert, 
                                quake.Depth, 
                                quake.Magnitude, 
                                quake.Place, 
                                quake.Type, 
                                quake.Converted_Time_GMT).all()
        session.close()
        jsonquake = jsonify(results)
        return(jsonquake)

        
if __name__ == '__main__':
    app.run(debug=True)
