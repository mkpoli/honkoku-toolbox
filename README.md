# 翻刻ツールボックス

![ロゴ](./assets/honkoku.png)

日本の古典籍を翻刻する時によく利用する入力補助機能を集めたツールボックスです。

![パネル](./docs/panel.png)

## サポートされているサイト

- [みんなで翻刻](https://honkoku.org/app/)
- [日本語版 Wikisource](https://ja.wikisource.org/)

## 使い方

### インストール

UserScript を入れてください。

### 開く方法

翻刻サイトのエディタを開くと右に「飜」のロゴ文字が表示されます。

![開く方法](./docs/open.gif)

自動的に表示されます。

## 開発

```bash
bun i
bun dev
```

### リリース

1. `bun run version`でバージョンを上げてタグコミットを作成しプッシュする。
2. GitHub Actions がビルドを行い、リリースページが自動的に作成されるのを待つ。
3. GreasyFork などの UserScript 共有サイトでリリースする。

## ライセンス

[MIT License](LICENSE) © 2023-2024 mkpoli
