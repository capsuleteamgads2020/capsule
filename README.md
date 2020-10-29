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

### Run below to instatll firebase
```
npm install --save firebase
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Deploy branch
# https://stackoverflow.com/a/48633080
# Test locally with ngrok server
# Run npm install -g ngrok to install ngrok globally
```
npm install -g ngrok
```
# Start the serve
```
ngrok http 8080 -host-header="localhost:8080"
ngrok http --host-header=rewrite 8080
```
