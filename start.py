from killit import socketio, app

socketio.run(app, host='0.0.0.0', port=8080, debug=True)