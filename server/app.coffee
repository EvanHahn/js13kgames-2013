HTMLS = ['../src/index.html']
STYLESHEETS = ['../src/the.css']
JAVASCRIPTS = [
  '../src/vendor/miniclass.js'
  '../src/vendor/extend.js'
  '../src/lib/sounds.js'
  '../src/config.js'
  '../src/main.js'
]

express = require 'express'
fs = require 'fs'
minify = (require 'html-minify').minify

app = express()

app.set 'port', process.env.PORT or 8000

buildHTML = ->
  css = ''
  STYLESHEETS.forEach (src) ->
    contents = fs.readFileSync(src, 'utf8')
    css += "\n\n#{contents}\n\n"
  css = "<style>#{css}</style>"
  js = ''
  JAVASCRIPTS.forEach (src) ->
    contents = fs.readFileSync(src, 'utf8')
    js += "\n\n;#{contents}\n\n;\n"
  js = "<script>(function() { #{js} })();</script>"
  body = ''
  HTMLS.forEach (src) ->
    contents = fs.readFileSync(src, 'utf8')
    body += contents
  """<!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <title>Origin</title>
  #{css}
  </head>
  <body>
  #{body}
  #{js}
  </body>
  </html>
  """

app.get "/prod", (req, res) ->
  res.send minify(buildHTML(), 20000)

app.get "*", (req, res) ->
  res.send buildHTML()

app.listen(app.get "port")
console.log("Server started on port #{app.get 'port'}")
