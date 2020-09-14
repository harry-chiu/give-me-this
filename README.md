# Give Me This!

這是一個因為懶惰而誕生的 CLI 工具，<br>
你可以將想要複製的「檔案/資料夾」存取在一個 key 上，<br>
之後就可以透過 CLI 快速的把資源給取出來。

## Install

因為是 CLI 所以必須安裝在全域上。

npm

```bash
npm install -g give-me-this
```

yarn

```bash
yarn add global give-me-this
```

## Quick Start

當你要新建一個 Component 的時候可能會需要做以下的麻煩事：<br>

- 新建資料夾
- 新建 index.js
- 寫好 index.js render function
- 新建 style.js
- 寫好 style.js 的基本 style
- ...

現在我們可以將 Component 儲存成 key。<br>
之後要用的時候直接拿出來用就可以了，<br>
就像是一個 Template 一樣！<br>
現在下方是我們的專案資料夾：

```
/project
  /src
    /components
      /Card
        - index.js
        - style.js
```

現在我們先到 components 資料夾：

```bash
cd ./project/src/components
```

輸入 command 把 Card 存在 key "Card" 上：

```bash
giveme -s Card ./Card
```

接下來我們就可以在任意地方輸入：

```bash
giveme Card
```

就可以拿出我們的 Card Template 了！<br>
可喜可賀，可喜可賀。

## How To Use

目前開放三個功能：

##### 存取

將檔案儲存到 KEY 上，需要注意的是`你提供的 PATH 是一個相對路徑`，<br>
初始路徑則是基於你當前的所在位置。

```bash
giveme -s KEY PATH
```

API
| param | required | description |
|-------|----------|-------------|
| KEY | required | 你要存取的檔案會記錄在這個 key |
| PATH | required | 你要存取的檔案的路徑 |

##### 取出

輸入 KEY 將存取的檔案取出。

```bash
giveme KEY PATH
```

API
| param | required | description |
|-------|----------|-------------|
| KEY | required | 你要取出的檔案所對應的 KEY |
| PATH | optional | 取出的檔案所要存放的路徑 |

##### 列出所有 KEY

你可能會想知道自己存了哪些 KEY。

```bash
giveme -l
```
