#!/bin/bash
rm -rf backend/public/client
rm -rf backend/public/overlay
mkdir -p backend/public
cd client
npm install
npm run-script build
cp -a build ../backend/public/client
cd ../overlay
npm install
npm run-script build
cp -a build ../backend/public/overlay
