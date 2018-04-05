#!/bin/bash

lsof -n -i4TCP:8889 | grep LISTEN