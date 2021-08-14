#!/bin/bash

electron-forge make --platform=linux --arch=x64 && electron-forge make --platform=linux --arch=ia32 && electron-forge make --platform=linux --arch=arm64 && electron-forge make --platform=linux --arch=armv7l