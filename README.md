# DGB-Scanner

A DigiByte network scanner.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and [Mongodb](https://www.mongodb.com/) installed.

```sh
git clone https://github.com/digicontributer/dgb-scanner # or clone your own fork
cd dgb-scanner
npm install
cd wepapp/
npm install
npm rebuild node-sass
./node_modules/.bin/ng build -prod  -aot
cd ..
npm start
```

DGB-Scanner will default to development enviroment and be located at [localhost:9000](http://localhost:9000/).

## Contributing
Please send pull requests for bug fixes, code optimization, and ideas for improvement.