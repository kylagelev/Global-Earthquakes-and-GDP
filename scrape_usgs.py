from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd 
from webdriver_manager.chrome import ChromeDriverManager
import time


# Initialize browser
def init_browser():
    executable_path = {'executable_path': ChromeDriverManager().install()}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()

    # set base url
    browser.visit('https://earthquake.usgs.gov/earthquakes/map/?extent=-89.99999,-863.4375&extent=89.99999,672.1875&map=false')

    #set sleep timer
    time.sleep(1)

    # HTML Object
    html = browser.html

    # Parse HTML with Beautiful Soup
    soup = bs(html, 'html.parser')

    #find all earthquake information
    all_region = soup.find_all('h6', class_='header')
    all_time = soup.find_all('span', class_='time')
    all_mag = soup.find_all('span', class_='ng-star-inserted')
    # selected latest earthquake information
    newest_region = all_region[0].text
    newest_magnitude = all_mag[5].text
    newest_time = all_time[0].text

   
    quake_info = {
        "newest_region": newest_region,
        "newest_magnitude": newest_magnitude,
        "newest_time": newest_time,
    }

    # Close the browser after scraping
    browser.quit()

    # Return results
    return quake_info