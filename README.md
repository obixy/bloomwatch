# OBloom
Bloomwatch is a project for monitoring and visualizing environmental data, focusing on the detection of algal blooms in water bodies.

The prediction workflow involves several key steps. First, multispectral indices are calculated using satellite bands (Bands 02-06, B10, and B11). Next, features are extracted, including neighborhood and delta values, as well as contextual information like season and day of the year. These features are then used to train a RandomForestRegressor model, which predicts both the timing of the next bloom occurrence and generates a flower index map for that event. This approach enables accurate forecasting and visualization of algal bloom dynamics.

## Test URL

Access the proof of concept (POC) at the link below:

[Go to the test environment](https://labs.obixy.com.br/)

## How to use

1. Clone the repository:
    ```bash
    git clone https://github.com/Obixy/bloomwatch.git
    ```
2. Install the dependencies:
    ```bash
    cd bloomwatch/frontend
    npm install
    ```
3. Start the application:
    ```bash
    npm run dev
    ```

## Technologies used

- JupterNotebooks
- React

## Screenshots

Here is the screen that allows you to view the monitored regions and analyze, through the timeline, the bloom events that occurred during the selected period.

![Region Select](docs/assets/event-select.png)

Below is an image illustrating how users can select specific events to analyze within the chosen region. This feature enables focused investigation of particular occurrences and helps users correlate different events for deeper insights.

![Event Select](docs/assets/region-select.png)