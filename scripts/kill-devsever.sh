#!/bin/bash

lsof -i :8888 | awk '{system("kill -9 " $2)}'