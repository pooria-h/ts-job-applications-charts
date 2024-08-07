## App overview
This Vue app displays the data of my job applications in Pie charts.
I have been tracking the state of my applications in a Google sheet. After finding a job, I converted that data to a JSON file and decided to make this app.

[Demo on Github pages](https://pooria-h.github.io/ts-job-applications-charts/)


![Chart photo](https://i.imgur.com/n6jVoUI.png)

### App structure
```
|--/src
    |--/assets
    |--/components
      |--/Chart
        |--index (The main component that communicates with the store)
          |--/components (sub components of Chart. they emit events and get the data by props)
      |--/shared (The reusable components)
    |--/constants (Where the static data mostly strings are being kept)
    |--/interfaces (The blueprints of the data structure)
    |--/pages (Each page directs the user to a specific URL)
    |--/store (where the shared data is being kept)
    |--/utils (Reusable functions or Classes without any dependency)
```

## App Setup

`Node version: v18.18.2`

```sh
npm install
```

To run on local machine:
```sh
npm run dev
```

To Build:
```sh
npm run build
```

To run Unit tests:
```sh
npm run test:unit
```

To run End to end tests:
```sh
npm run test:e2e
```

