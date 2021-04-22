# Global-Earthquakes-and-GDP
## Question: What are key traits to major earthquakes and how do major earthquakes impact the global economy?
### Opportunities of growth in the face of adversity or opportunities of growth for opportunistic countries...
We suspect that a major earthquake will negatively affect a country's GDP, resulting in a temporary decline, however, following a timeframe of two years, we approximate that the GDP will recover.

## Data Clean-up
#### Data Sources
* [Earthquake Data - USGS](https://earthquake.usgs.gov/fdsnws/event/1/)
* [GDP Data - World Bank](https://data.worldbank.org/indicator/NY.GDP.MKTP.PP.KD?end=2019&start=1991)

#### Methodology
Earthquake data collected was earthquakes with greater than 7.0 magnitude and within the last 20 years. 
GDP data collected was GDP (annual in US dollars), GDP Growth, and GDP per capita.

#### Clean-up
Loaded datasets into dataframes using pandas in jupyter-notebook. Reviewed data for deficiences, performed data validation, and loaded dataframes to SQL. 
From SQL, downloaded schema for SQLite to use in Flask app. 

*All data csvs and jupyter notebook used for clean-up can be found in the Data_Cleaning folder.*

#### Flask App
Following creation of database, created flask connection via sqlalchemy to SQLite database.
Data links can be found at [All_Data](http://127.0.0.1:5000/api/v1.0/all_data).
Using created routes, specific datasets were loaded into Javascript files to create visualizations.
*These visualizations include the index.html page with scrape activity, heat map, and all three comparison graphs.*

*All Flask jupyter notebook and python test file can be found in the Flask folder.* \
**Main Flask app can be found in main under flask_app.py**

## Visualizations
*Based on earthquakes dataset and GDP datasets with emphasis on selected top 5 Earthquakes by Magnitude*

### Top 5 Earthquakes by Magnitude
* 2004 Sumatra (Indonesia) Earthquake, 9.1
* 2011 Tohoku Region (Japan) Earthquake, 9.1
* 2010 Bio-Bio (Chile) Earthquake, 8.8
* 2005 Sumatra (Indonesia) Earthquake, 8.6
* 2012 Sumatra (Indonesia) Earthquake, 8.6

#### Timeline with Magnitudes Graph
Line graph that shows earthquake magnitudes from 2000 to present. 
Used to assess relationship between time and magnitude, and to predict chance of potential large-scale earthquake within next few years.
Also, assesses whether the changes incurred to the planet over the years (Climate Change, etc) have affected the magnitude and frequencies of earthquakes.

*Javascript file used in html found in static/js under earthquake.js*

#### Magnitudes vs Depth Graph
Scatter plot that shows earthquake magnitudes vs depth. 
Used to assess whether there is relationship between greater magnitude and greater depth or vice versa.
It appears that greater magnitude earthquakes have smaller depth. 

*Javascript file used in html found in static/js under earthquake.js*

#### Heat Map
Compiled Map using Leaflet.js with heatlayer. 
Features markers indicating selected top 5 earthquakes by magnitude. 
Also includes tooltip so when mouse clicks on marker, place, magnitude, and date appears.

*Test Javascript file used in practice html found in Map/static/js under kg_app.js* \
**Javascript file used in Flask found in static/js under kg_app.js**

#### GDP, GDP growth, and GDP per capita vs Timeline Graph(s)
Interactive D3 graph with 3 dropdown including GDP, GDP growth, and GDP per capita over the last 20 years.
The top 5 greatest earthquakes each have a respective graph.
Each include a country flag animation that moves to time of earthquake and tooltip showing Country, date, and GDP value (based on selected Y value). 

*Test Javascript file used in practice html found in Individual Charts under app(2004).js, app(2005).js, app(2010).js, app(2011JPN).js, app(2012).js* \
**Javascript file used in html found in static/js under app(2004).js, app(2005).js, app(2010).js, app(2011JPN).js, app(2012).js**

#### Comparison Graph(s)
Interactive Plotly graph with annual GDP of respective country with earthquake and BRIC (Brazil, Russia, India, China) countries, plus the USA and the UK.
Gray box in each graph is a 1-2 year reference period to show country's GDP before and after earthquake.
Red box in each graph is the year period of the earthquake. 
These are used to help visualize potential changes in GDP, and see whether the drop in GDP in one country enabled another country's GDP to grow (opportunistic advances). (Example: Major export of country affected by earthquake was overtaken by other country.)

*Test Javascript file used in practice html found in Comparative_Graphs/static/js under plotly_CHL.js, plotly_IDN.js, plotly_JPN.js* \
**Javascript file used in Flask found in static/js under plotly_CHL.js, plotly_IDN.js, plotly_JPN.js**

## Website
All html files can be found in Templates folder. \
All Javascript files can be found in static/js folder. \
All CSS file(s) can be found in static/css folder. 

#### Timeline.js
Timeline.js was the chosen JS library that has not been used in class. 
Used to create an interactive timeline of the Top 5 Major Earthquakes by magnitude. 
Includes dates, images, and video for respective earthquake.

## Conclusion
* No significant increase or decrease of earthquakes observed in last 20 years.
* Higher depth correlated to lower magnitudes.
* Indonesia had slight decrease in GDP growth following 2004 and 2005 earthquakes, but overall grew in the following years.
* Indonesia also remained with the lowest GDP in comparison to other countries, and it appears as though there was no significant change in other countries' GDP as a result of Indonesia's own slight drop in GDP.
* Japan had decrease in GDP and GDP per capita, with a slight increase in GDP growth (Japan's GDP growth was already in negatives prior to earthquake).
* Japan was steadily growing at a similar rate to China, however following their earthquake, they experienced a decline. China continued to grow, while Japan remained under them, with no future potential surpass. 
* Chile had slight increase in GDP growth resultins in increase in GDP and GDP per capita.
* Chile, like Indonesia, remained with the lowest GDP in comparison to other countries. However, it does appear that other countries had a slight increase in their GDP's in the year of Chile's earthquake.

**All visuals, description of process, and conclusions with post mortem can be found in powerpoint presentation**
