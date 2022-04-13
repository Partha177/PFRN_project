FROM node:17.3

WORKDIR /usr/src/app   
#create directory inside container

COPY package.json ./
COPY yarn.lock ./
#copying files to WORKDIR

RUN yarn install
# RUN yarn add openssl


COPY prisma/schema.prisma ./prisma/
                     #inside container
RUN npx prisma generate

COPY . .
#copying all files to current directory

RUN  yarn build

EXPOSE 8080

CMD ["yarn", "start"]