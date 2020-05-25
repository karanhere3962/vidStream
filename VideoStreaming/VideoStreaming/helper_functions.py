import secrets as random
import string
import logging

log = logging.getLogger("apps_logger")


def random_string_generator(ssize=4, usePunctuation=True):

    punctuation = "!^*()" if usePunctuation == True else ""
    r = ''.join([random.choice(string.ascii_letters +
                               string.digits + punctuation) for n in range(ssize)])
    log.debug(f"Returning random string : {r}")
    return r
