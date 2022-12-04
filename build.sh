#!/bin/bash
mkdir /backend/public
cd client
npm install
npm run-script build
cp -a build ../backend/public/client
cd ../overlay
npm install
npm run-script build
cp -a build ../backend/public/overlay
