FROM python:3.9

RUN mkdir -p /opt/application/flask
COPY . /opt/application/flask
WORKDIR /opt/application/flask

RUN apt-get update
RUN pip install -r requirements.txt
ENV SQLALCHEMY_DATABASE_URI="postgresql://coworkdbadmin:password123@postgres-db:5432/cowork"
EXPOSE 5000

ENTRYPOINT ["gunicorn", "-b", ":5000"]
CMD ["run_dev"]
