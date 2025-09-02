### YouTube Clone (React + TypeScript + Vite)

モダンフロントエンドスタックで構築したシンプルな YouTube クローンです。動画一覧、詳細、アップロード、ユーザー認証、プロフィール編集などの基本機能を備えています。

- **フレームワーク**: React 19 + TypeScript + Vite 7
- **状態管理**: Jotai
- **ルーティング**: React Router DOM 7
- **HTTP クライアント**: Axios（認証ヘッダの自動付与）
- **Lint/型**: ESLint 9 / TypeScript 5

---

## 必要条件

- Node.js（18 以上を推奨）
- npm もしくは pnpm / yarn

## セットアップ

1. 依存関係のインストール
   ```bash
   npm install
   ```
2. 環境変数の設定（`.env`）
   ```bash
   # API のベース URL（必須）
   VITE_API_URL=https://api.example.com
   ```

## 実行方法

- 開発サーバー起動

  ```bash
  npm run dev
  ```

  デフォルトで `http://localhost:5173` が立ち上がります。

- ビルド

  ```bash
  npm run build
  ```

- プレビュー（ビルド成果物の確認）

  ```bash
  npm run preview
  ```

- Lint
  ```bash
  npm run lint
  ```

## 環境変数

- **VITE_API_URL**: API のベース URL。`src/lib/api/index.ts` で `axios.create({ baseURL })` に利用します。

## 認証について

`src/lib/api/interceptors/request.ts` のリクエストインターセプタで、`localStorage` の `token` を参照し、存在する場合は `Authorization: Bearer <token>` を自動付与します。

```12:20:src/lib/api/index.ts
import axios from "axios";
import { addAuthorizationHeader } from "./interceptors/request";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
api.defaults.headers.common["Content-Type"] = "application/json";
api.interceptors.request.use(addAuthorizationHeader);

export default api;
```

## 主な画面/機能

- ホーム（動画一覧）: `src/pages/Home`
- 動画詳細: `src/pages/VideoDetail`
- 動画アップロード: `src/pages/CreateVideo`
- マイ動画一覧: `src/pages/MyVideos`
- サインイン/サインアップ: `src/pages/Signin`, `src/pages/Signup`
- プロフィール編集: `src/pages/EditProfile`

## ディレクトリ構成（抜粋）

```text
src/
  components/
    Header/
    Sidebar/
    FlashMessage/
  lib/
    api/
      index.ts               # Axios インスタンスと共通設定
      interceptors/
        request.ts           # Authorization ヘッダ自動付与
  modules/
    auth/                    # 認証関連の状態/リポジトリ
    account/
    users/
    videos/
  pages/
    Home/
    VideoDetail/
    CreateVideo/
    MyVideos/
    Signin/
    Signup/
    EditProfile/
```

## スクリプト

- **dev**: Vite 開発サーバーを起動
- **build**: TypeScript ビルド + Vite ビルド
- **preview**: ビルド成果物をローカルで確認
- **lint**: ESLint を実行

## 開発メモ

- API と通信する際は `api`（`src/lib/api/index.ts`）を利用してください。
- 認証トークンは `localStorage.setItem('token', '<JWT>')` で保存すると自動的にヘッダに付与されます。
- 新規ページや機能の追加時は、`pages/` と `modules/` の分離方針を踏襲してください。

## ライセンス

本リポジトリのライセンスは未指定です。必要に応じて追記してください。
