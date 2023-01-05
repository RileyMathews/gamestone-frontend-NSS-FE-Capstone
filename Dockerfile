FROM node:16

RUN apt-get update -y
RUN apt-get install python -y
RUN apt-get install -y build-essential

USER node
WORKDIR /code

ENTRYPOINT [""]

CMD ["/bin/bash"]
