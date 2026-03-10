# DHI (Docker Hardended Image) sample

Docker から無料で提供されている DHI の Node.js と、そのイメージに近い Docker Hub の Node.js のイメージを比較するためのレポジトリです。

express を利用した簡単な Web サーバープログラムを用意しました。

ベースイメージは以下の通りです。

| |Docker Hub|DHI|
|---|---|---|
|base image|node:24-bookworm-slim|dhi.io/node:24-debian12|
|multi stage build|No|Yes|
|root user|Yes|No|


## Build & Docker Scout

参考までに 2026/3/10 時点の比較を記載します。

|Vulnerabilities|Critical|High|Medium|Low|
|---|---|---|---|---|
|node:24-bookworm-slim|0C|5H|1M|24L|
|dhi.io/node:24-debian12|0C|0H|0M|9L|


Build: 

```sh
docker build -t node-sample:debian .
```

Scout: 

```sh
docker scout quickview
    i New version 1.20.2 available (installed version is 1.20.0) at https://github.com/docker/scout-cli
    v Image stored for indexing  
    v Indexed 359 packages

    i Base image was auto-detected. To get more accurate results, build images with max-mode provenance attestations.
      Review docs.docker.com ↗ for more information.

 Target     │  local://node-sample:debian  │    0C     5H     1M    24L 
   digest   │  347055e17516                │
 Base image │  node:24-bookworm-slim       │    0C     5H     1M    24L 
```


dhi.io/node:24-debian12

Build: 

```sh
docker build -t node-sample:dhi .
```

Scout: 

```sh
    i New version 1.20.2 available (installed version is 1.20.0) at https://github.com/docker/scout-cli
    v Image stored for indexing  
    v Indexed 85 packages

    i Base image was auto-detected. To get more accurate results, build images with max-mode provenance attestations.
      Review docs.docker.com ↗ for more information.

 Target   │  node-sample:dhi  │    0C     0H     0M     9L  
   digest │  aefb3cd54341     │
```




