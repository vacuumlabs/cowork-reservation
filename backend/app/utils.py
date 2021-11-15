import configparser
import logging
import logging.config

from flask import Flask


def config_logging():
    logging.config.fileConfig(
        "config/logging.conf",
    )
    logger = logging.getLogger("root")
    logger.debug("logging.conf got")
