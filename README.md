# capsule

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy branch
https://stackoverflow.com/a/48633080

### Install ngrok server globally to test locally
```
npm install -g ngrok
```
### Start the serve
```
ngrok http 8080 -host-header="localhost:8080"
```
or
```
ngrok http --host-header=rewrite 8080
```
