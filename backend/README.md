[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Backend for cowork reservation system

This backend is syncing events of multiple instances of G-suite calendars and allowing them to share the same resources.

## Installation

### Run backend in docker

1. [Install docker on your machine](https://docs.docker.com/get-docker/)

2. Open terminal in the `/backend` directory
3. Build the container

   `docker-compose build`

4. Run the container

   `docker-compose up`

   or run with build flag combining 3. and 4.

   `docker-compose up --build`

### Local installation
!!! Python version >3.9  requiered !!! 
1. [Install python](https://www.python.org/downloads/)

2. Open terminal in the `/backend` directory

!!! You can also install all the pip modules to your global enviroment !!! (In that case jump to step 5.)

3. Make sure you have `virtualenv` installed using pip (You can check that using `pip list`)

   `pip install virtualenv`

4. Create python virtual enviroment

   `virtualenv venvForLocal` or\
   `python -m virtualenv venvForLocal`

5. Activate virtual enviroment

   Windows Command Prompt:    `.\venvForLocal\Scripts\activate.bat`\
   Windows PowerShell:        `.\venvForLocal\Scripts\activate.ps1`

   Unix or MacOs Bash shell:  `./venvForLocal/bin/activate`\
   Unix or MacOs Csh shell:   `./venvForLocal/bin/activate.csh`\
   Unix or MacOs Fish shell:  `./venvForLocal/bin/activate.fish`

6. Install all required modules

   `pip install -r ./requirements.txt`

7. Install pre-commit hook for Black, Mypy reformatter

   `pre-commit install`

### Run backend in local

1. Make sure that you finished all steps in `Local installation`

2. Make sure your backend.pgdb container is running via docker

   `docker start pgdb` (if container isn't running)

3. Send `flask run` to terminal

4. Local server should be now hosted on http://127.0.0.1:5555/, you can change this in .flaskenv

