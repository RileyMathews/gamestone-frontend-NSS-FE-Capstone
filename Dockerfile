FROM node:8

RUN apt-get update -y
RUN apt-get install python -y
RUN apt-get install -y build-essential

WORKDIR /code

ENTRYPOINT [""]

CMD ["bash"]
