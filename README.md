# Gothic Asset Wizard

An all-in-one tool for browsing, editing, previewing and compiling Gothic assets.

> **Note:**  
> This project is still in early development and is not yet ready for use.

Technologies used:
- backend: C++20
- frontend: React using TypeScript

## Preview

![Preview](docs/img/main_preview.jpg)

## Features

- [ ] Browse VDF files
  - [ ] Seamless integration with regular filesystem content (`_Work` folder)
- [ ] Live preview
  - [ ] Textures
  - [ ] Models
  - [ ] Animations
- [ ] Asset compilation

## Project overview

At the moment the project only works on Windows. We wait until the AppPlatform
library gets support for Linux and possibly macOS.

### How to build

Clone the repository with submodules:

```bash
git clone --recurse-submodules https://github.com/GothicTools/AssetWizard.git
```

Run the cmake command in the root directory:

```bash
cmake -B build -S .
```

Build the project:

```bash
cmake --build build
```

The process may very depending on your preferred CMake generator.

### Folder structure

The [`Frontend`](Frontend/README.md) folder contains React TS project that handles everything related
to a user interface.

The [`Backend`](Backend/README.md) folder contains the C++ code that handles all the heavy lifting
such as parsing VDF files, compiling assets, etc.

### Libraries used

We use a bunch of helper libraries:

- [AppPlatform](https://github.com/UnstableBytes/AppPlatform) - integration of a webview into a C++ application
- [phoenix](https://github.com/GothicKit/phoenix) - managing Gothic assets
- [fmtlib](https://github.com/fmtlib/fmt) - formatting text
- [rapidjson](https://github.com/Tencent/rapidjson) - parsing JSON messages