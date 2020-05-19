import secrets as random
import string

def random_string_generator(ssize=4, usePunctuation=True):

        punctuation = "!^*()" if usePunctuation == True else ""
        r = ''.join([random.choice(string.ascii_letters + string.digits + punctuation) for n in range(ssize)])
        return r