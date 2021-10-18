FROM python:3.9

RUN mkdir -p /opt/application/flask
COPY . /opt/application/flask
WORKDIR /opt/application/flask

RUN apt-get update
RUN pip install -r requirements.txt
ENV DATABASE_HOST postgres-db
EXPOSE 5000

ENTRYPOINT ["gunicorn", "-b", ":5000"]
CMD ["app:create_app()"]
