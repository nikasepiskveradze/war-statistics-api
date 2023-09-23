# War Track - Russia-Ukraine War Losses API

Welcome to the [War Track](http://war-track.com/) GitHub repository! War Track is a project that aims to create an API providing comprehensive data on war-related losses from both Ukraine and Russia during the conflict in Ukraine. This project relies on data from the Oryx website, We are using [Oryx Data](https://github.com/scarnecchia/oryx_data) and [Scrape Oryx](https://github.com/scarnecchia/scrape_oryx) repositories by the author [scarnecchia](https://github.com/scarnecchia) for collecting data.

## Introduction
The conflict in Ukraine has had a profound impact on the lives of many people, resulting in casualties, injuries, and displacements. War Track seeks to provide a central repository of information on war losses. 

We hope this API project offers a valuable resource for researchers, journalists, and anyone interested in understanding the human cost of the ongoing conflict.

## Usage
To utilize the War Track API, make HTTP requests to the provided endpoints (see [API Endpoints](http://war-track.com/)). You can integrate this API into your applications, websites, or research projects to access the latest information on war losses in Ukraine and Russia.

## API Endpoints
War Track offers the following endpoints:

`/api/stats/equipments`: Get the information about losses by total equipment

`/api/stats/equipment-types`: Retrieve data about all the equipments types which is used.

`/api/stats/equipments/{country}`: Access information by `country` to get losses about equipments with relevant date.

`/api/stats/systems`: Get the information about losses by system types

`/api/stats/system-types`: Retrieve data about all the system types which is used.

`/api/stats/systems/{country}`: Access information by `country` to get losses about systems with relevant date.

Each endpoint supports various query parameters for filtering and customizing the data you receive.

For detailed information on how to use these endpoints and the available query parameters, please refer to the [API Documentation](http://war-track.com/).

## Installation
To deploy War Track locally follow the installation instructions provided in the bellow:

First you need to download Docker in your computer, and build Docker image by typing:

```bash
$ docker-compose build
```

In order to run, first install packages locally in your project

```bash
$ npm install
```

This command will run Database and start API with relevant ports and hosts
```bash
$ docker-compose up
```

For stopping docker container use:

```bash
$ docker-compose down
```

**DO NOT FORGET:** create and fill `.env` file according to `.env.example`, other project won't run

## Contributing
Contributions to this project are welcome! If you would like to contribute to the development of the War Track API, please fork the project, create relevant branch and the send PR.

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software in accordance with the terms specified in the license.