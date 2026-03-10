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


node:24-bookworm-slim

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


dhi.io/node:24-debian12-dev

Build: 

```sh
docker build -t node-sample:dhi .
```

Scout: 

```sh
    i New version 1.20.2 available (installed version is 1.20.0) at https://github.com/docker/scout-cli
    v Image stored for indexing
    v Indexed 85 packages
    ! failed to close image source C:\Users\ytabuchi\AppData\Local\Temp\docker-scout\sha256\12364cfb314500c8512f5f05b67f4acff7b9a1e56d1134c8281c9ca7b23323e0\17102b30-e8d9-4600-8abb-6ff253a01320: 2 errors occurred:
        * unlinkat C:\Users\ytabuchi\AppData\Local\Temp\stereoscope-715540463\docker-tarball-image-4000675533\sha256: The process cannot access the file because it is being used by another process.
        * unlinkat C:\Users\ytabuchi\AppData\Local\Temp\stereoscope-715540463\docker-tarball-image-4000675533\sha256: The process cannot access the file because it is being used by another process.

    ! failed to delete temporary image archive C:\Users\ytabuchi\AppData\Local\Temp\docker-scout\sha256\12364cfb314500c8512f5f05b67f4acff7b9a1e56d1134c8281c9ca7b23323e0\17102b30-e8d9-4600-8abb-6ff253a01320: unlinkat C:\Users\ytabuchi\AppData\Local\Temp\docker-scout\sha256\12364cfb314500c8512f5f05b67f4acff7b9a1e56d1134c8281c9ca7b23323e0\17102b30-e8d9-4600-8abb-6ff253a01320: The process cannot access the file because it is being used by another process.
    i Base image was auto-detected. To get more accurate results, build images with max-mode provenance attestations.
      Review docs.docker.com ↗ for more information.

 Target   │  local://node-sample:dhi  │    0C     0H     0M     9L 
   digest │  12364cfb3145             │
   ```






## Docker Hub でやろうとした軌跡

Docker Hub の Scout でマルチステージ、SBOM 生成（`sbom=true`）、ビルド証明書付き（`provenance=true`）でスコアを上げようとしたら、DHI の方がスコアが低くなってしまったｗ


```sh
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --sbom=true --provenance=true \
    --push \
    -t <ORG_NAME>/node-sample:debian
    .
```


```sh
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --sbom=true --provenance=true \
    --push \
    -t <ORG_NAME>/node-sample:dhi
    .
```

