# phasmophobia_table
A tool to get the ghost given the collected proof

## Prerequisites

1. Install node and npm
2. Install react

I'm using node `v18.12.1` & npm `8.19.2`

## Build instructions

Currently the web page with the interactive UI, the overlay, and the backend are 3 separate apps.

- The interactive UI is under `client`. It is a React app, needs building.
- The OBS Overlay is under `overlay`. It is a React app, needs building.
- The backend stores the session shared between clients and overlays. It is a plain node app that stores the sessions in memory. No need to build it, but it will serve the overlay & client html pages from their build folders.

So:

1. Build the overlay & client
2. Start the backend

```
./build.sh
cd backend
npm start
```

## To debug the client or the overlay

Go to their folder and run:

```
npm start
```
