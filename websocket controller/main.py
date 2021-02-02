from tornado import websocket
import tornado.ioloop

class EchoWebSocket(websocket.WebSocketHandler):
    def check_origin(self, origin):
        allowed = ["https://site1.tld", "https://site2.tld"]
        if origin in allowed:
            print("allowed", origin)
            return 1
        return 1

    def open(self):
        print("Websocket Opened")

    def on_message(self, message):
        self.write_message(input())

    def on_close(self):
        print("Websocket closed")

application = tornado.web.Application([(r"/", EchoWebSocket),])


if __name__ == "__main__":
    application.listen(9999)
    tornado.ioloop.IOLoop.instance().start()
