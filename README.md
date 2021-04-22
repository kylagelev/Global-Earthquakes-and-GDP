# Global-Earthquakes-and-GDP
## Question: What are key traits to major earthquakes and how do major earthquakes impact the global economy?
We suspect that a major earthquake will negatively affect a country's GDP, resulting in a temporary decline, however, following a timeframe of two years, we approximate that the GDP will recover.

## Data Clean-up
#### Data Sources
* [Earthquake Data - USGS](https://earthquake.usgs.gov/fdsnws/event/1/)
* [GDP Data - World Bank](https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD?end=2019&start=1991)

#### Methodology
Earthquake data collected was earthquakes with greater than 7.0 magnitude and within the last 20 years. 
GDP data collected was GDP (annual in US dollars), GDP Growth, and GDP per capita.

#### Clean - up
Loaded datasets into dataframes using pandas in jupyter-notebook. Reviewed data for deficiences, performed data validation, and loaded dataframes to SQL. 
From SQL, downloaded schema for SQLite to use in Flask app. 

*All data csvs and jupyter notebook used for clean-up can be found in the Data_Cleaning folder.*

#### Flask App
Following creation of database, created flask connection via sqlalchemy to SQLite database.
Data links can be found at [All_Data](http://127.0.0.1:5000/api/v1.0/all_data).
Using created routes, specific datasets were loaded into Javascript files to create visualizations.
*These visualizations include the index.html page with scrape activity, heat map, and all three comparison graphs.*

*All Flask jupyter notebook and python test file can be found in the Flask folder.*
**Main Flask app can be found in main under flask_app.py**

## Visualizations
#### Timeline with Magnitudes Graph
#### Magnitudes vs Depth Graph
#### Heat Map
#### GDP, GDP growth, and GDP per capita vs Timeline Graphs
#### Comparison Graphs

## Website

All html files can be found in Templates folder. 
All Javascript files can be found in static/js folder.
All CSS file can be found in static/css folder.

#### Timeline.js

Timeline.js was the chosen JS library that has not been used in class. 
Used to create an interactive timeline of the Top 5 Major Earthquakes by magnitude. 
Includes dates, images, and video for respective earthquake.

## Conclusion

