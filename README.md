# website
This repository is the main https://myhomework.space website. (if you're looking for https://app.myhomework.space, that's the [client repository](https://github.com/MyHomeworkSpace/client))

## How to run
For local development, you can start the Jekyll server like so:
```shell
bundle install
bundle exec jekyll server --port 4003
# visit http://localhost:4003 in your browser!
```
To have this run alongside the client and API server, you should reverse proxy it via another webserver like nginx.

This will use the default settings in `_config.yml`, which should be fine for local development. You can tell Jekyll to use a different config file by adding a command line option. for example, `--config _config.yml,_config_staging2.yml` will enable the staging2 config.