import configparser
import logging
import logging.config
import os

IN_DOCKER = os.environ.get("IS_IN_DOCKER", False)


def ConfigLogging():
    logging.config.fileConfig(
        "config/logging.conf",
    )
    logger = logging.getLogger("root")
    logger.debug("logging.conf got")
    # if IN_DOCKER:
    #     db_info.read("db/resources/database.ini")
    # else:
    #     db_info.read("db/resources/database_local.ini")
