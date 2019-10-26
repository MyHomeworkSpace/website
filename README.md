# website
This repository will serve as the main https://myhomework.space website. The client repository will be moved to https://app.myhomework.space.

A live preview is served at https://dev.myhomework.space.

## How to run
First, copy `_data/vars-sample.yml` to `_data/vars.yml`. Adjust `yars.yml` as needed. Then, run this commands:
```shell
bundle install
bundle exec jekyll server --port 4003
# visit http://localhost:4003 in your browser!
```
To have this run alongside the client and API server, you should reverse proxy it via another webserver like nginx.