FROM node:alpine

WORKDIR /usr/ibm-task

COPY ./ ./

RUN nmp install

CMD ["npm", "start"]

# I can't use Docker to containerize my app because my Windows version is Home. 
# With Windows Home I have problems installing Docker and can't find Hyper-v which is needed to open Docker.