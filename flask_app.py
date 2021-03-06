import numpy as np
import scrape_usgs
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json
from datetime import datetime, timedelta
from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template, redirect




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


# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/tremors_app"
mongo = PyMongo(app)

@app.route("/")
def home():

       # find one record of mars info
    quake_info = mongo.db.collection.find_one()

    return render_template("index.html", quake_info=quake_info)


# setup scrape route
@app.route("/scrape")
def scrape():
   
    quake_data = scrape_usgs.scrape()
    

    mongo.db.collection.update({}, quake_data, upsert=True)

    # Redirect back to home page
    return redirect("/")


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

        
#        find one record of mars info
    quake_info = mongo.db.collection.find_one()

    return render_template("top5.html", quake_info=quake_info)
        

@app.route("/api/v1.0/jpn_comp")
def jpn_comp():
        
        return render_template('jpn_comp.html')







@app.route("/api/v1.0/all_data")
def all_data():

        return (f"Welcome to the Data of Global Earthquakes and GDP.<br/><br/>"
                "Available Routes:<br/>" 
                "/api/v1.0/get_GDP <br/>"
                "/api/v1.0/get_GDP_BRA_json<br/>"
                "/api/v1.0/get_GDP_CHL_json<br/>"
                "/api/v1.0/get_GDP_CHN_json<br/>"
                "/api/v1.0/get_GDP_GBR_json<br/>"
                "/api/v1.0/get_GDP_IDN_json<br/>"
                "/api/v1.0/get_GDP_IND_json<br/>"
                "/api/v1.0/get_GDP_JPN_json<br/>"
                "/api/v1.0/get_GDP_RUS_json<br/>"
                "/api/v1.0/get_GDP_USA_json<br/>"
                "/api/v1.0/get_quake_json<br/>")

@app.route('/api/v1.0/get_GDP')
def get_GDP():
        session = Session(engine)
        # results = session.query(gdp.Series_Name, 
        #                         gdp.Series_Code, 
        #                         gdp.Country_Name,
        #                         gdp.Country_Code, 
        #                         gdp.YearZero, 
        #                         gdp.YearOne, 
        #                         gdp.YearTwo, 
        #                         gdp.YearThree,
        #                         gdp.YearFour,
        #                         gdp.YearFive,
        #                         gdp.YearSix,
        #                         gdp.YearSeven,
        #                         gdp.YearEight,
        #                         gdp.YearNine,
        #                         gdp.YearTen,
        #                         gdp.YearEleven,
        #                         gdp.YearTwelve,
        #                         gdp.YearThirteen,
        #                         gdp.YearFourteen,
        #                         gdp.YearFifteen,
        #                         gdp.YearSixteen,
        #                         gdp.YearSeventeen,
        #                         gdp.YearEighteen,
        #                         gdp.YearNineteen
        #                         ).all()

        results = session.execute("SELECT * FROM gdp")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp = all_results
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

@app.route('/api/v1.0/get_GDP_BRA_json')
def get_GDP_BRA_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_bra")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_bra_json = all_results
        return(jsongdp_bra_json)

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

@app.route('/api/v1.0/get_GDP_CHL_json')
def get_GDP_CHL_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_chl")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_chl_json = all_results
        return(jsongdp_chl_json)

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

@app.route('/api/v1.0/get_GDP_CHN_json')
def get_GDP_CHN_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_chn")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_chn_json = all_results
        return(jsongdp_chn_json)

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

@app.route('/api/v1.0/get_GDP_GBR_json')
def get_GDP_GBR_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_gbr")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_gbr_json = all_results
        return(jsongdp_gbr_json)

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

@app.route('/api/v1.0/get_GDP_IDN_json')
def get_GDP_IDN_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_idn")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_idn_json = all_results
        return(jsongdp_idn_json)

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

@app.route('/api/v1.0/get_GDP_IND_json')
def get_GDP_IND_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_ind")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_ind_json = all_results
        return(jsongdp_ind_json)

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

@app.route('/api/v1.0/get_GDP_JPN_json')
def get_GDP_JPN_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_jpn")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_jpn_json = all_results
        return(jsongdp_jpn_json)

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

@app.route('/api/v1.0/get_GDP_RUS_json')
def get_GDP_RUS_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_rus")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_rus_json = all_results
        return(jsongdp_rus_json)

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

@app.route('/api/v1.0/get_GDP_USA_json')
def get_GDP_USA_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM gdp_usa")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_usa_json = all_results
        return(jsongdp_usa_json)

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

@app.route('/api/v1.0/get_quake_json')
def get_quake_json():
        session = Session(engine)
        results = session.execute("SELECT * FROM quake")
        response = [dict(row.items()) for row in results]
        all_results = json.dumps(response)

        session.close()
        jsongdp_quake_json = all_results
        return(jsongdp_quake_json)

if __name__ == '__main__':
    app.run(debug=True)
