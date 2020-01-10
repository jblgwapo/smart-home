from bottle import Bottle, get, run, ServerAdapter


class SSLWSGIRefServer(ServerAdapter):
    def run(self, handler):
        from wsgiref.simple_server import make_server, WSGIRequestHandler
        import ssl
        if self.quiet:
            class QuietHandler(WSGIRequestHandler):
                def log_request(*args, **kw): pass
            self.options['handler_class'] = QuietHandler
        srv = make_server(self.host, self.port, handler, **self.options)
        srv.socket = ssl.wrap_socket (
         srv.socket,
         certfile='privkey.pem',  # path to certificate
         server_side=True)
        srv.serve_forever()

@get("/x")
def get_x():
 return "Hi there"

#instead of:
#run(host="0.0.0.0", port=8090)
#we use:
srv = SSLWSGIRefServer(host="0.0.0.0", port=8090)
run(server=srv)
