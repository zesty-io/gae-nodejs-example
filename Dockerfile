FROM mhart/alpine-node:9

WORKDIR /app

COPY package.json /app/
COPY node_modules/@zesty-io/ /app/node_modules/@zesty-io/
COPY src/ /app/src/

# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.
RUN npm install --only=prod --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)

CMD npm start
