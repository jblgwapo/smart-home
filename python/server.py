import pymongo
import os
import bottle
import traceback

# webserver and submodules
app = bottle.Bottle()



@bottle.route('/')
def index():
    return "This page just got served!"





# run the webserver
if __name__ == '__main__':
    try:
        bottle_args = {
            'server': 'cherrypy',
            'host': '0.0.0.0',
            'port': 8080,
            'debug': True,
        }

        # use ssl if cert / key exist
        print(os.path.exists('cert.pem'))
        if os.path.exists('cert.pem'):
            bottle_args['certfile'] = 'cert.pem'
        if os.path.exists('privkey.pem'):
            bottle_args['keyfile'] = 'privkey.pem'

        bottle.run(**bottle_args)
    except:
        traceback.print_exc()
