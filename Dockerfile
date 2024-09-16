FROM ubuntu:latest
LABEL authors="sergayka"

ENTRYPOINT ["top", "-b"]