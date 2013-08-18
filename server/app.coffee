express = require 'express'
fs = require 'fs'
minify = (require 'html-minify').minify

app = express()

app.set 'port', process.env.PORT or 8000

buildHTML = ->

  files = JSON.parse(fs.readFileSync('files.json', 'utf8'))

  css = ''
  files.stylesheets.forEach (src) ->
    contents = fs.readFileSync(src, 'utf8')
    css += "\n\n#{contents}\n\n"
  css = "<style>#{css}</style>"
  js = ''
  files.javascripts.forEach (src) ->
    contents = fs.readFileSync(src, 'utf8')
    js += "\n\n;#{contents}\n\n;\n"
  js = "<script>(function() { #{js} })();</script>"
  body = ''
  files.htmls.forEach (src) ->
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
