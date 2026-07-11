<h1 align="center">🧙‍♂️ Wizard-AI</h1>

<p align="center"><i>無駄を語らず、クラッシュを防ぎ、78%のトークンを削ぎ落とす。そして動く。</i></p>

<p align="center">
  <a href="https://github.com/darkrei08/Wizard-AI/stargazers"><img src="https://img.shields.io/github/stars/darkrei08/Wizard-AI?style=flat-square" alt="stars"/></a>
  <a href="https://github.com/darkrei08/Wizard-AI/releases"><img src="https://img.shields.io/badge/release-v0.46.0-blue?style=flat-square" alt="release"/></a>
  <a href="https://www.npmjs.com/package/@darkrei08/wizard-ai-cli"><img src="https://img.shields.io/badge/npm-v0.46.0-red?style=flat-square" alt="npm"/></a>
  <img src="https://img.shields.io/badge/works%20with-47%20agents%20%26%20161%2B%20skills-purple?style=flat-square" alt="works with"/>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL%20v3-orange?style=flat-square" alt="license"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🏅%20TRENDING-Agentic%20OS%20%26%20Token%20Optimizer-10B981?style=for-the-badge" alt="Trendshift Badge"/>
</p>

<h3 align="center"><b>~78%削減のトークン効率（最大94%省力化）· ~80%のコスト削減 · 5x 高速化 · 100% 安全な自動ロールバック保護</b></h3>

<p align="center">
  実際のコーディングエージェント（Claude Code、Antigravity、OpenHands）を用いた複雑なアーキテクチャ設計、バグ修正、およびパッケージ導入（<code>bun</code>、<code>nuxt</code>、<code>python</code>、<code>node</code>、<code>rust</code>）で実証済み。Wizard-AIは、<b>#ponytail</b>（実用主義のシニアエンジニア思考）、<b>#caveman</b>（CLI出力の75%削減）、<b>#sqz</b>（JSONの20倍圧縮）、および <b>ai-os v0.46.0</b>（ゼロダウンタイム自動安全ロールバック）を統合します。
  <br/>
  <a href="benchmarks/wizard_ai_token_benchmark.ipynb"><b>完全なベンチマーク・ノートブックを見る</b></a> · <a href="README.md#reproduce-it"><b>データを再現する</b></a>.
</p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.it.md">Italiano</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.zh.md">中文</a>
</p>

---

## 🔥 深刻な技術的課題：AIエージェントが引き起こす「$50の幻覚・環境クラッシュコスト」

自律型AIコーディングエージェントを実際のプロダクト環境で使用すると、2つの致命的な課題に直面します：

1. **コンテキストウィンドウの雪崩とAPIコストの爆発：** エージェントは80,000トークン以上のディレクトリ構造やテストログを平気でコンテキストに投入します。結果として幻覚が増加し、1つの機能追加に平均 **~$18.50** のコストがかかります。
2. **システム環境の破壊（「午前2時の環境崩壊」）：** エージェントが自律的に `npm install -g` や `uv tool install` を実行した際、パッケージの破損やビルド競合によって、システム全体の環境が破壊される危険性があります。

### 💡 Wizard-AI による究極の解決策 (`v0.46.0`)

Wizard-AIは、AIエージェントとOS間の**自己修復型抽象レイヤー (`ai-os`) および 5つのエンジニアリングループ**として機能します：

```mermaid
graph TD
    A[🧙‍♂️ WIZARD-AI MASTER ECOSYSTEM<br/><b>v0.46.0</b>] --> B[💰 極限のトークン効率化<br/>LLMコストを78%削減]
    A --> C[🛡️ 自己修復と自動ロールバック<br/>環境のクラッシュをゼロに]
    A --> D[🔄 5-Loop Engineering<br/>確定的 MoE ルーティング]
```

## 🚀 クイック・スタート (`1コマンドで導入`)

```bash
npx -y @darkrei08/wizard-ai-cli@latest
```

詳細な手動導入手順や完全なドキュメントは、[英語メインREADME](README.md) をご覧ください。
