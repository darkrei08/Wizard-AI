# liurun-bookwriter-skills (by liangdabiao)

Source: https://github.com/liangdabiao/liurun-bookwriter-skills

# liurun-bookwriter · 双风格长文写作 Skill 集

> 两个 skill，两种风格，一个目的——让你写出有"作家味"的长文。

本项目收录两个互补的中文长文写作 skill：

| Skill | 风格定位 | 一句话 | 最适合 |
|-------|---------|--------|--------|
| **[liurun-bookwriter](#一liurun-bookwriter--刘润风格商业长文)** | 商业洞察 / 方法论 | 心里装的不是"我"，是"你" | 商业评论、企业案例、参访游记 |
| **[luozhenyu-bookwriter](#二luozhenyu-bookwriter--罗振宇风格启发式长文)** | 认知 / 启发 / 商业 | 做事的人，不是评论家 | 认知升级、AI 时代应对、个人成长 |

---

## 快速选择

| 你想写 | 推荐 Skill |
|--------|-----------|
| 商业评论、企业财报分析、5 分钟商学院体 | **liurun-bookwriter** |
| 商业洞察、商业方法论、参访游记 | **liurun-bookwriter** |
| 商业格言型金句（"飞流直下三千尺"）| **liurun-bookwriter** |
| 认知升级、启发式短文、长期主义主张 | **luozhenyu-bookwriter** |
| 跨年演讲、AI 时代应对、个人成长 | **luozhenyu-bookwriter** |
| 自嘲开场、对仗短句（"一XX，就XX"）| **luozhenyu-bookwriter** |
| 历史人物讲现代道理（曾国藩、拿破仑）| **luozhenyu-bookwriter** |
| 60-150 字的决策框架 | **luozhenyu-bookwriter**（罗胖60秒）|

**不确定？** 看核心问题——你的文章是"**解决问题**"还是"**激发思考**"？前者选刘润，后者选罗振宇。

详细对比见 [§三、对比与互补](#三对比与互补)。

---

# 一、liurun-bookwriter · 刘润风格商业长文

> 同理心是最重要的基本功。心里装的不是 "我"，是 "你"。
> —— 刘润

刘润（前微软战略合作总监、润米咨询创始人、《5分钟商学院》主理人）28 年商业写作经验的完整复刻。基于其《我这28年的写作心法》提炼的 8 大心法、3 种结构、SCQA 逻辑势能、5商派 SCA++ 模板、7 种 callout，专为商业长文创作设计。

---

## 这个 Skill 能做什么

| 你说一句话 | 它帮你写 |
|-----------|----------|
| "写一篇商业评论" | 3 段式长文，ASC 开门见山 |
| "用刘润的风格写" | 默认按 8 大心法执行 |
| "给我来一篇 32 条" | 32 句话，CSA 突出忧虑 |
| "写一篇 10 点式" | 10 个环环相扣的点，QSCA 突出信心 |
| "做一篇 ASC" | 用 ASC 逻辑势能开篇 |
| "写一篇 5 分钟商学院体" | 5 步 SCA++ 模板 |
| "写一篇商业洞察 / 方法论" | 商业长文 + 案例支撑 |
| "写一篇企业家专访 / 参访游记" | 10 点式最适合 |
| "分析一下拼多多的财报" | 32 条或 3 段式 + 数据标注 |

---

## 5 分钟上手

### 第 1 步：触发 Skill

直接对 Agent 说：

```
"用刘润的风格写一篇关于鸿蒙的 32 条评论"
```

Agent 会自动按以下流程执行：

```
1. 识别结构类型 → 32 条
2. 选定 SCQA 变体 → CSA（默认）
3. 确认选题角度 → 鸿蒙 32 条
4. 调研素材（自动） → 案例 + 数据 + 金句
5. 撰写 → 遵循 8 大心法
6. QC 自检 → 12 项质量检查
7. 等待你确认每一条
```

### 第 2 步：每次确认

每写完一段/一个点/一条，Agent 会停下来等你确认。无须你手动操作。

### 第 3 步：导出 PDF

```bash
python scripts/export_pdf.py article.md
```

---

## 8 大写作心法（核心心智模型）

| # | 心法 | 一句话 | 量化指标 |
|---|------|--------|----------|
| 1 | **同理心** | 心里装的不是 "我"，是 "你" | 开头 3 段内必有同理心锚点 |
| 2 | **对象感** | 写给"马云"看 | 「你」≥ 8 次/千字 |
| 3 | **君子自污** | 把好事给对方，坏事给自己 | 每篇至少 1 个自污框 |
| 4 | **逻辑势能** | 飞流直下三千尺 | 显式标注 SCQA 至少 1 个 |
| 5 | **5商派 SCA++** | 抓住稍纵即逝的注意力 | 5 步结构完整 |
| 6 | **3 种结构** | 编辑基本要求 | 结构与标题严格匹配 |
| 7 | **单反聚焦** | 一直打，打到透 | 每段 ≥ 1 个故事/举例/比方 |
| 8 | **游标卡尺** | 短、准、改 | 句长 ≤ 45 字 |

> 详细说明见 [references/style-dna.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/style-dna.md)

---

## 3 种结构蓝图

| 类型 | 段落结构 | SCQA 默认 | 篇幅 | 最适合 |
|------|----------|-----------|------|--------|
| **3 段式** | §01 引言 + §02-§04 主体 + §05 最后的话 | ASC | 1500-2500 字 | 商业评论、方法论 |
| **10 点式** | 引子 + 01-10 + 收束 | QSCA | 2500-4000 字 | 案例拆解、参访游记 |
| **32 条** | 32 句要点 | CSA | 2000-3000 字 | 事件评论、热点回应 |
| **5商派** | 场景导入 + 打破认知 + 核心逻辑 + 举一反三 + 回顾总结 | ASC | 2000-4000 字 | 5分钟商学院音频 |

**怎么选？**

- 不确定 → 默认 3 段式（编辑基本要求）
- 案例多、有采访 → 10 点式
- 表达立场、要克制 → 32 条
- 做 5 分钟商学院音频 → 5商派 SCA++

> 详细蓝图见 [references/book-blueprints.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/book-blueprints.md)

---

## 3 种 SCQA 逻辑势能

| 变体 | 顺序 | 效果 | 典型场景 |
|------|------|------|----------|
| **ASC** | 答案 → 背景 → 冲突 | 开门见山 | 工作报告、建议书、3 段式默认 |
| **CSA** | 冲突 → 背景 → 答案 | 突出忧虑 | 热点回应、32 条默认 |
| **QSCA** | 问题 → 背景 → 冲突 → 答案 | 突出信心 | 大问题大方案、10 点式默认 |

**显式标注方法**：

```markdown
**A 答案**：把提成制改为奖金制。
[正文展开]

**C 冲突**：但这样做会引发销售团队的反弹。
[正文展开]
```

> 详细逻辑势能说明见 [references/style-dna.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/style-dna.md) 的"心法 4"

---

## 7 种 callout 特殊内容块

| 名称 | 触发场景 | 格式 |
|------|----------|------|
| **同理心框** | 开头 / 段落衔接 | `> **你在想什么**：...` |
| **自污框** | 谦虚开场 / 自我解嘲 | `> **先认个错**：...` |
| **金句框** | 段落收束 / 观点点睛 | `> **金句**：...` |
| **故事框** | 讲故事 / 案例 | `> **故事**：...` |
| **举例框** | 降低认知成本 | `> **举例**：...` |
| **比方框** | 窥探本质 | `> **比方**：...` |
| **推敲框** | 用词对比 | `> **推敲**：[原文] vs [改后]` |

> 详细格式见 [references/callout-patterns.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/callout-patterns.md)

---

## 安装

### 方式 1：复制到 Agent skills 目录

```bash
# Claude Code
cp -r liurun-bookwriter ~/.claude/skills/

# WorkBuddy
cp -r liurun-bookwriter ~/.workbuddy/skills/
```

### 方式 2：作为本地 Skill 目录

直接告诉 Agent skill 所在路径即可，无需复制。

---

## 依赖

| 依赖 | 用途 | 是否必需 |
|------|------|----------|
| Python 3.8+ | 运行验证 / PDF 脚本 | 必需 |
| pandoc | Markdown → PDF | 导出 PDF 时必需 |
| XeLaTeX | 中文字体渲染 | 导出 PDF 时必需 |
| 中文字体 | PDF 中文显示 | 推荐思源宋体/霞鹜文楷 |

### 各平台安装

#### macOS

```bash
brew install pandoc
brew install --cask mactex
brew install --cask font-source-han-serif
brew install --cask font-lxgw-wenkai
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt install pandoc texlive-xetex texlive-lang-chinese fonts-noto-cjk
```

#### Windows

```powershell
winget install --id JohnMacFarlane.Pandoc
winget install --id MiKTeX.MiKTeX
```

### 验证依赖

```bash
python scripts/export_pdf.py --list-fonts
echo "# 测试" > test.md
python scripts/export_pdf.py test.md
```

---

## 命令行工具

### 1. PDF 导出

```bash
# 基本用法
python scripts/export_pdf.py article.md

# 指定输出文件
python scripts/export_pdf.py article.md -o output.pdf

# 指定字体
python scripts/export_pdf.py article.md --font "Source Han Serif SC"

# 详细输出
python scripts/export_pdf.py article.md -v

# 列出可用中文字体
python scripts/export_pdf.py --list-fonts
```

**PDF 样式**（已针对商业长文优化）：

- 字体：思源宋体（Windows/Linux） / 霞鹜文楷（首选） / 微软雅黑（兜底）
- 字号：11pt
- 行距：1.5
- 边距：3cm

### 2. 结构验证

```bash
# 验证长文结构（自动识别 3段式/10点式/32条/5商派）
python scripts/validate_structure.py article.md

# 静默模式（只返回退出码）
python scripts/validate_structure.py article.md --quiet
```

**自动检查 12 项**：

```
✅ 文章类型识别     ✅ SCQA 变体识别
✅ 段落数正确性     ✅ 段落编号连续性
✅ 禁用词零容忍     ✅ 同理心锚点
✅ "我" / "你" 频率 ✅ "大家" = 0
✅ callout 数量     ✅ SCQA 节点标注
✅ 段尾"最后的话"   ✅ 模糊词检查
```

### 3. 多 Agent 协作

```bash
# 初始化一篇 32 条长文
python scripts/agent_scheduler.py --init "32-tiao-hongmeng" --type "32条" --scqa "CSA"

# 初始化一篇 10 点式长文
python scripts/agent_scheduler.py --init "hua-wei-10" --type "10点式" --scqa "QSCA"

# 查看当前状态
python scripts/agent_scheduler.py --status

# 获取下一批任务
python scripts/agent_scheduler.py --next

# 推进到下一阶段
python scripts/agent_scheduler.py --advance
```

> 5 个 Agent 角色：主编 / 调研 / 写作 / 编辑 / 排版
> 详细流程见 [references/agent-protocol.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/agent-protocol.md)

---

## 文件结构

```
liurun-bookwriter/
├── SKILL.md                    # 主 skill 定义（Agent 自动加载）
├── README.md                   # 本文件
├── LICENSE                     # MIT 许可证
│
├── references/                 # 参考文档（Agent 写作时查阅）
│   ├── book-blueprints.md      # 3 种结构蓝图 + SCQA 配对
│   ├── chapter-templates.md    # 3 种结构模板 + 5商派 SCA++ 模板
│   ├── style-dna.md            # 8 大心法完整 DNA
│   ├── opening-techniques.md   # 6 种开头技巧
│   ├── callout-patterns.md     # 7 种 callout 格式
│   ├── quality-checkpoints.md  # 12+10 项 QC 清单
│   ├── agent-protocol.md       # Agent 协作流程
│   └── research-sources.md     # 商业调研来源
│
├── assets/                     # 资源模板
│   ├── templates/
│   │   ├── cover-template.md   # 4 种长文封面模板
│   │   └── toc-template.md     # 4 种结构目录模板
│   └── schemas/
│       └── outline-schema.json # 大纲数据结构
│
├── scripts/                    # 工具脚本
│   ├── export_pdf.py           # PDF 导出（思源宋体/11pt/行距1.5）
│   ├── validate_structure.py   # 结构验证（12 项 QC 自动检查）
│   └── agent_scheduler.py      # 多 Agent 协作调度
│
└── tests/                      # 测试
    ├── baseline-checks.md      # 5 类基线失败模式
    ├── pressure-scenarios.md   # 7 个压力测试场景
    └── fixtures/
        └── sample-3duan.md     # 3 段式示例长文
```

---

## 质量保证

每篇长文自动执行 12 项 QC：

### 结构检查（4 项）
- [ ] 文章类型与元数据一致
- [ ] 段落数正确（3段式=5、10点式=12、32条=32、5商派=5）
- [ ] 段尾有"最后的话"/"收束"（3段式、10点式）
- [ ] 编号连续无中断

### 风格检查（5 项）
- [ ] 禁用词为零（重点：「大家」= 0）
- [ ] 「我」频率 ≥ 3 次/千字
- [ ] 「你」频率 ≥ 8 次/千字
- [ ] 模糊词连续出现 ≤ 3 次
- [ ] 句长 ≤ 45 字

### 内容检查（3 项）
- [ ] 开头 3 段内有同理心锚点
- [ ] callout 数量 ≥ 1（金句/故事/举例/比方）
- [ ] SCQA 节点显式标注 ≥ 1 个

> 完整清单见 [references/quality-checkpoints.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/quality-checkpoints.md)

---

## 不适用场景

- 学术论文格式
- 纯故事小说类创作
- 超短文案（朋友圈、微博）
- 需要复杂图表的财务报告
- 法律条文、技术手册

---

## 示例：3 段式长文

参考 [tests/fixtures/sample-3duan.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/tests/fixtures/sample-3duan.md) 的完整示例。结构如下：

```markdown
# [标题]

**创作者**: 刘润
**出处栏目**: 公众号「刘润」
**发布日期**: YYYY-MM-DD
**结构类型**: 3段式
**SCQA 变体**: ASC
**目标读者**: 创业者 · 商业读者
**核心洞察**: [一句话]

---

## §01 引言：为什么写这篇文章
[同理心锚点]
[为什么读者应该读下去]

## §02 [主体一：第一个核心论点]
[从答案切入（ASC 的 A）]
[用故事/例子/比方支撑]
[金句收束]

## §03 [主体二：第二个核心论点]
[承接 §02 的结尾]
[更深一层的洞察]
[金句收束]

## §04 [主体三：第三个核心论点]
[再深一层]
[可执行的方法或建议]
[金句收束]

## §05 最后的话
[回顾三个论点]
[升华到更高的层次]
[金句 / 方法 / 问题收束]
```

---

## 常见问题

**Q：可以写别的风格的商业长文吗？**

不推荐。这个 Skill 专精于复刻刘润风格。如果要写其他风格，请关闭本 Skill。

**Q：32 条凑不齐 32 条怎么办？**

不要凑。宁可少说。可改用 3 段式（5 段）或 10 点式（10 个点）。

**Q：PDF 中文乱码怎么办？**

```bash
# 确认中文字体已安装
fc-list :lang=zh

# macOS: brew install --cask font-source-han-serif
# Linux: sudo apt install fonts-noto-cjk
```

**Q：长文中能不能引用其他作家？**

可以，但必须标注出处，不要暗示是刘润本人观点。详见 [references/research-sources.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/research-sources.md) 的"金句素材库"。

**Q：商业数据要怎么处理？**

必须标注时效（"截至 2024 年 9 月"）和来源（公司公告/权威媒体/知名研究机构）。详见 [references/research-sources.md](file:///d:/liurun-bookwriter-main/skills/liurun-bookwriter/references/research-sources.md)。

---

# 二、luozhenyu-bookwriter · 罗振宇风格启发式长文

> 做事的人，不是置身事外指点江山，而是躬身入局，把自己变成解决问题的关键变量。
> —— 罗振宇

罗振宇（得到 App 创始人、《罗辑思维》主讲人、「时间的朋友」跨年演讲主讲人、《文明之旅》主讲人）14 年内容创作经验的完整复刻。基于 2012-2026 年间的《罗辑思维》视频文稿、「罗胖60秒」3652条音频、《成大事者不纠结》《阅读的方法》《启发》三本出版书、11 场「时间的朋友」跨年演讲、《文明之旅》节目提炼的 12 大心法、3 种结构、3 种 SCQA 变体、7 种核心 callout（+6 扩展），专为认知/启发/商业长文创作设计。**核心原则：学风格不抄句子，每篇金句/故事/比喻现场原创。**

> 详细文档见 [luozhenyu-bookwriter/README.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/README.md)

---

## 这个 Skill 能做什么

| 你说一句话 | 它帮你写 |
|-----------|----------|
| "用罗振宇的风格写一篇" | 默认按 12 大心法执行（金句/故事现场原创）|
| "写一篇罗胖60秒" | 60-150 字短文，PEI 现象-解释-启发 |
| "写一篇罗辑思维长文" | 2000-4000 字长文，TQA 触发-问题-答案 |
| "做一篇跨年演讲体" | 10000+ 字演讲稿，CAA 具体-抽象-行动 |
| "写一篇 AI 时代普通人怎么办" | 跨年演讲体或长文，灵魂拷问 + 历史人物 |
| "写一篇关于曾国藩的" | 长文 + 历史人物 + 启发 |
| "写一篇关于长期主义" | 跨年演讲体 + 躬身入局 + 启发 |
| "写一篇个人成长" | 长文 + 历史人物 + 金句 |
| "写一篇热点回应" | 60秒或长文，TQA 变体 |

---

## 12 大写作心法（核心心智模型）

> ⚠️ **最重要**：金句/故事/比喻必须为当前主题**现场原创**，禁止照搬代表作原句。

| # | 心法 | 一句话 | 量化指标 |
|---|------|--------|----------|
| 1 | **躬身入局** | 做事的人，不是评论家 | 每篇 ≥ 1 个躬身入局框 |
| 2 | **长期主义** | 做一件有价值的事，一直做 | 每篇 ≥ 1 个长期主义框 |
| 3 | **启发式输出** | 给启发，不给答案 | 至少 1 个启发框 |
| 4 | **一具体，就深刻** | 别空谈，给案例 | 每千字 ≥ 2 个具体故事 |
| 5 | **一行动，就创新** | 别空想，先做起来 | 每篇 ≥ 1 个行动召唤 |
| 6 | **一困惑，就出门** | 别闭门造车 | 至少 1 次"出门"场景 |
| 7 | **故事细节** | 关键在细节，**每篇换新故事** | 每千字 ≥ 2 个，连续多篇不重复 |
| 8 | **金句主义** | 每段有金句，**必须现场原创** | ≥ 3 句/千字，禁止套代表作原句 |
| 9 | **打比方** | 把抽象翻译成具象 | 每篇 ≥ 1 个原创比方 |
| 10 | **举例降认知** | 用具体的人讲具体的事 | 每篇 ≥ 1 个原创举例 |
| 11 | **动词驱动** | 用动作让读者看见 | 全文动词 ≥ 1/3 |
| 12 | **谦卑自嘲** | 我是罗胖（不编减肥数字）| 开场用"我是罗胖"建立身份 |

> 详细说明见 [style-dna.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/style-dna.md)

---

## 3 种结构蓝图

| 类型 | 段落结构 | SCQA 默认 | 篇幅 | 最适合 |
|------|----------|-----------|------|--------|
| **罗胖60秒** | 1 现象 + 1 解释 + 1 启发 | PEI（现象-解释-启发）| 60-150 字 | 短内容、决策框架、热点回应 |
| **罗辑思维长文** | §01 引言 + §02-§04 主体 + §05 收束 | TQA（触发-问题-答案）| 2000-4000 字 | 商业评论、认知升级、人物拆解 |
| **跨年演讲稿** | 开场 + 多个小主题 + 行动心法 + 升华 | CAA（具体-抽象-行动）| 10000+ 字 | 跨年演讲、年度总结、大型演讲 |

**怎么选？**

- 不确定 → 默认罗辑思维长文（TQA 触发-问题-答案）
- 短内容、要快 → 罗胖60秒（PEI 现象-解释-启发）
- 跨年演讲、要气势 → 跨年演讲稿（CAA 具体-抽象-行动）

> 详细蓝图见 [book-blueprints.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/book-blueprints.md)

---

## 3 种 SCQA 逻辑势能（罗振宇特定）

| 变体 | 顺序 | 效果 | 典型场景 |
|------|------|------|----------|
| **TQA** | 触发 → 问题 → 答案 | 故事+拷问+答案 | 罗辑思维长文默认 |
| **CAA** | 具体 → 抽象 → 行动 | 一具体就深刻+升华+行动 | 跨年演讲默认 |
| **PEI** | 现象 → 解释 → 启发 | 短平快+启发 | 罗胖60秒默认 |

**显式标注方法**：

```markdown
**T 触发**：曾国藩初到长沙练兵，手下湘勇不服管，他没急，先扎硬寨、挖深沟。

[正文展开]

**Q 问题**：为什么"做眼前事"比"想当初"更能破纠结？

[正文展开]

**A 答案**：因为纠结的本质是"想当初"，解药是把注意力从过去挪回当下。

[正文展开]
```

---

## 7 种核心 callout 特殊内容块

> 另有 6 种扩展 callout（SCQA 节点 / SCQA 变体 / 决策框架 / 迷茫的明白人 / 二元解构 / 反常识），详见 [callout-patterns.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/callout-patterns.md)。

| 名称 | 触发场景 | 格式 |
|------|----------|------|
| **躬身入局框** | 反对评论家、鼓励行动 | `> **做事的人**：[动作]` |
| **长期主义框** | 微行动、坚持 | `> **长期主义**：[微行动]` |
| **一XX就XX框** | 金句对仗 | `> **一具体，就深刻**：[案例]` |
| **故事框** | 讲故事、人物 | `> **故事**：[场景 + 细节]` |
| **金句框** | 段落收束、点睛 | `> **金句**：[朗朗上口的一句]` |
| **启发框** | 段落收束、给角度 | `> **我的启发**：[角度]` |
| **时代拷问框** | 灵魂拷问、热点 | `> **时代拷问**：[问题]` |

---

## 安装

```bash
# 已在项目 .workbuddy/skills/ 目录中（默认位置）
ls d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/

# 或复制到其他位置
cp -r .workbuddy/skills/luozhenyu-bookwriter ~/.claude/skills/
```

直接告诉 Agent skill 所在路径即可使用。

---

## 依赖

| 依赖 | 用途 | 是否必需 |
|------|------|----------|
| Python 3.8+ | 运行验证脚本 | 必需 |

---

## 命令行工具

### 1. 结构验证

```bash
# 验证长文结构（自动识别 罗胖60秒/罗辑思维长文/跨年演讲稿）
python scripts/validate_structure.py article.md

# 静默模式（只返回退出码）
python scripts/validate_structure.py article.md --quiet
```

**自动检查 12 项**：

```
✅ 文章类型识别     ✅ SCQA 变体识别
✅ 段落数正确性     ✅ 段落编号连续性
✅ 禁用词零容忍     ✅ 躬身入局锚点
✅ "我" / "你" 频率 ✅ "大家" = 0
✅ callout 数量     ✅ SCQA 节点标注
✅ 段尾"收束"       ✅ 模糊词检查
```

### 2. 多 Agent 协作

```bash
# 初始化一篇跨年演讲稿
python scripts/agent_scheduler.py --init "ai-1000days" --type "跨年演讲稿" --scqa "CAA"

# 初始化一篇罗胖60秒
python scripts/agent_scheduler.py --init "60s-decision" --type "罗胖60秒" --scqa "PEI"

# 查看当前状态 / 推进
python scripts/agent_scheduler.py --status
python scripts/agent_scheduler.py --next
python scripts/agent_scheduler.py --advance
```

> 5 个 Agent 角色：主编 / 调研 / 写作 / 编辑 / 排版
> 详细流程见 [agent-protocol.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/agent-protocol.md)

### 3. PDF 导出

```bash
# 将 Markdown 长文转换为 PDF
python scripts/export_pdf.py article.md -o article.pdf

# 指定字体
python scripts/export_pdf.py article.md --font "Microsoft YaHei"
```

---

## 文件结构

```
.workbuddy/skills/luozhenyu-bookwriter/
├── SKILL.md                    # 主 skill 定义（Agent 自动加载）
├── README.md                   # 本文件
├── LICENSE                     # MIT 许可证
│
├── references/                 # 参考文档（Agent 写作时查阅）
│   ├── book-blueprints.md      # 3 种结构蓝图 + 3 种 SCQA 配对
│   ├── chapter-templates.md    # 3 种结构模板 + 跨年演讲 SCA 模板
│   ├── style-dna.md            # 12 大心法完整 DNA + 生成公式
│   ├── opening-techniques.md   # 6 种开头技巧
│   ├── callout-patterns.md     # 7 种核心 callout + 6 种扩展 callout 格式
│   ├── quality-checkpoints.md  # 12+10 项 QC 清单
│   ├── agent-protocol.md       # Agent 协作流程
│   ├── research-sources.md     # 罗振宇内容研究来源
│   └── real-works-extraction.md# 20 篇代表作真实特征提取
│
├── assets/                     # 资源模板
│   ├── templates/
│   └── schemas/
│
├── scripts/                    # 工具脚本
│   ├── validate_structure.py   # 结构验证（12 项 QC 自动检查）
│   ├── agent_scheduler.py      # 多 Agent 协作调度
│   └── export_pdf.py           # PDF 导出
│
└── tests/                      # 测试
    ├── baseline-checks.md
    ├── pressure-scenarios.md
    └── fixtures/
        └── sample-3duan.md     # 罗辑思维长文示例
```

---

## 质量保证

每篇长文自动执行 12 项 QC：

### 结构检查（4 项）
- [ ] 文章类型与元数据一致
- [ ] 段落数正确（罗胖60秒=1 段 / 罗辑思维长文=5 段 / 跨年演讲稿=多个小主题）
- [ ] 段尾有"收束"（罗辑思维长文、跨年演讲稿）
- [ ] 编号连续无中断

### 风格检查（5 项）
- [ ] 禁用词为零（重点：「大家」= 0）
- [ ] 「我」频率 ≥ 4 次/千字
- [ ] 「你」频率 ≥ 6 次/千字
- [ ] 模糊词连续出现 ≤ 3 次
- [ ] 句长 ≤ 40 字（比刘润更短）

### 内容检查（3 项）
- [ ] 开场 3 段内有自嘲或故事锚点
- [ ] callout 数量 ≥ 1（躬身入局/长期主义/金句/故事/启发等）
- [ ] SCQA 节点显式标注 ≥ 1 个

> 完整清单见 [quality-checkpoints.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/quality-checkpoints.md)

---

## 不适用场景

- 学术论文格式
- 纯虚构故事类创作
- 超短文案（朋友圈、微博 100 字内）
- 财务报告、合同、说明书
- 法律条文、技术手册

---

## 示例：罗辑思维长文

参考 [tests/fixtures/sample-3duan.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/tests/fixtures/sample-3duan.md) 的完整示例。结构如下：

```markdown
# [标题]

[副标题]

**创作者**: 罗振宇
**出处栏目**: 公众号「罗辑思维」/ 得到 App / 「时间的朋友」跨年演讲
**发布日期**: YYYY-MM-DD
**结构类型**: 罗辑思维长文
**SCQA 变体**: TQA
**目标读者**: 终身学习者 · 商业读者 · 普通人
**核心洞察**: [一句话]

---

## §01 引言：罗胖式开场
[自嘲开场：我是罗胖，我...]
[故事锚点：某某人的真实故事]
[抛出核心问题 Q]

> **做事的人**：[反对评论家、鼓励行动]

## §02 [主体一：第一个核心论点]
[承接 §01 的问题]
[用历史人物讲现代道理]
[故事细节]
[金句收束]

> **金句**：[朗朗上口的一句]

## §03 [主体二：第二个核心论点]
[承接 §02 的结尾]
[更深一层的洞察]
[故事细节]
[金句收束]

> **一具体，就深刻**：[案例]

## §04 [主体三：第三个核心论点]
[承接 §03 的结尾]
[可执行的方法或建议]
[金句收束]

> **故事**：[一个具体场景 + 细节]

## §05 收束
[回顾三个论点]
[升华到"启发"层面]
[金句 + 启发收束]

> **我的启发**：[一个看问题的角度]
```

---

## 常见问题

**Q：可以写别的风格的认知长文吗？**

不推荐。这个 Skill 专精于复刻罗振宇风格。如果要写其他风格，请关闭本 Skill。

**Q：60 秒凑不齐 60-150 字怎么办？**

不要凑。宁可少说。可改用罗胖60秒短文或更长的"启发式"段落。

**Q：长文中能不能引用其他作家？**

可以，但必须标注出处（如"加缪说"、"史铁生说"）。详见 [research-sources.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/research-sources.md) 的"金句素材库"。

**Q：跨年演讲数据要怎么处理？**

必须标注时效（"截至 2024 年 12 月"）和来源。详见 [research-sources.md](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/references/research-sources.md)。

---

## 灵感来源

- 《罗辑思维》视频脱口秀（2012-至今）
- 「罗胖60秒」音频（2012-2022，3652条）
- 《成大事者不纠结》（2015）— 罗振宇
- 《阅读的方法》（2022）— 罗振宇
- 《启发》（2022）— 罗振宇
- 《时间的朋友》跨年演讲（2015-至今共11场）
- 《文明之旅》（2024-，20年长期项目）

---

# 三、对比与互补

## 核心差异

| 维度 | 罗振宇 | 刘润 |
|------|--------|------|
| **核心定位** | 认知/启发/商业 | 商业洞察/方法论 |
| **开头风格** | 自嘲开场（"我是罗胖"）| 同理心（"你可能正在..."）|
| **核心动作** | 躬身入局、做具体的事 | 商业洞察、5商派 |
| **金句类型** | 对仗短句（"一XX，就XX"）| 商业格言（"飞流直下三千尺"）|
| **历史人物** | 大量使用（曾国藩、张廷玉、拿破仑、卢梭）| 偶尔使用 |
| **金句密度** | ≥ 3 句/千字 | ≥ 2 句/千字 |
| **句长上限** | ≤ 40 字（更短）| ≤ 45 字 |
| **禁用词** | 「大家」= 0 | 「大家」= 0 |
| **SCQA 变体** | TQA / CAA / PEI | ASC / CSA / QSCA |
| **最适合** | 认知升级、AI 时代应对、个人成长 | 商业评论、企业案例 |

## 互补场景

| 场景 | 用罗振宇 | 用刘润 |
|------|---------|--------|
| **写"AI 时代普通人怎么办"**| ✅ 灵魂拷问 + 启发 | ✗ |
| **写"鸿蒙操作系统分析"**| ✗ | ✅ 商业洞察 + 案例 |
| **写"长期主义"**| ✅ 微行动 + 启发 | |
| **写"小公司如何做大"**| | ✅ 5商派 SCA++ |
| **写"如何不被 AI 替代"**| ✅ 决策框架 + 行动 | |
| **写"拼多多财报分析"**| | ✅ 32 条 + 数据 |
| **写"曾国藩的笨功夫"**| ✅ 历史人物 + 启发 | |
| **写"如何写一份商业计划书"**| | ✅ 5商派 SCA++ |

## 共用资源

两个 skill 共享相同的 Python 脚本结构：

```bash
# 两个 skill 的脚本可以互相参考实现
.workbuddy/skills/luozhenyu-bookwriter/scripts/
├── validate_structure.py    # 12 项 QC 自动检查
├── agent_scheduler.py       # 多 Agent 协作调度
└── export_pdf.py            # PDF 导出
```

---

## 共同依赖

| 依赖 | 用途 | 是否必需 |
|------|------|----------|
| Python 3.8+ | 运行验证 / PDF 脚本 | 必需 |
| pandoc | Markdown → PDF | 导出 PDF 时必需 |
| XeLaTeX | 中文字体渲染 | 导出 PDF 时必需 |
| 中文字体 | PDF 中文显示 | 推荐思源宋体/霞鹜文楷 |

### 各平台安装

#### macOS

```bash
brew install pandoc
brew install --cask mactex
brew install --cask font-source-han-serif
brew install --cask font-lxgw-wenkai
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt install pandoc texlive-xetex texlive-lang-chinese fonts-noto-cjk
```

#### Windows

```powershell
winget install --id JohnMacFarlane.Pandoc
winget install --id MiKTeX.MiKTeX
```

---

## 项目结构

```
liurun-bookwriter/
├── README.md                    # 本文件（项目总览）
│
├── .workbuddy/skills/
│   ├── liurun-bookwriter/       # 刘润风格商业长文 skill
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   ├── references/          # 8 大心法、3 种结构、SCQA、5商派、7 种 callout
│   │   ├── assets/              # 模板与数据结构
│   │   ├── scripts/             # PDF 导出、结构验证、Agent 调度
│   │   └── tests/               # 5 类基线 + 7 个压力测试
│   │
│   └── luozhenyu-bookwriter/    # 罗振宇风格启发式长文 skill
│       ├── SKILL.md
│       ├── README.md
│       ├── references/          # 12 大心法、3 种结构、3 种 SCQA 变体、7+6 种 callout
│       ├── assets/              # 模板与数据结构
│       ├── scripts/             # PDF 导出、结构验证、Agent 调度
│       └── tests/               # 4 类基线 + 7 个压力测试
│
└── *.md                         # 已完成的长文样例
    ├── jiangmen-economy-商业评价.md
    ├── xinhui-chenpi-商业评价.md
    ├── linux-do-商业评价.md
    ├── AI时代年轻人怎样快速赚钱-罗振宇风格.md
    ├── AI时代普通人怎么不学AI-罗振宇风格.md
    └── ...
```

---

## 灵感来源（合并）

### liurun-bookwriter

- 《我这28年的写作心法》— 刘润（2022 年 7 月发表于公众号）
- 《金字塔原理》— 巴巴拉·明托（SCQA 理论来源）
- 《5分钟商学院》— 刘润主理（5商派 SCA++ 来源）

### luozhenyu-bookwriter

- 《罗辑思维》视频脱口秀（2012-至今）
- 「罗胖60秒」音频（2012-2022，3652条）
- 《成大事者不纠结》（2015）— 罗振宇
- 《阅读的方法》（2022）— 罗振宇
- 《启发》（2022）— 罗振宇
- 《时间的朋友》跨年演讲（2015-至今共11场）
- 《文明之旅》（2024-，20年长期项目）

---

## 许可证

两个 skill 均采用 MIT 许可证。

- [liurun-bookwriter/LICENSE](file:///d:/liurun-bookwriter-main/.workbuddy/skills/liurun-bookwriter/LICENSE)
- [luozhenyu-bookwriter/LICENSE](file:///d:/liurun-bookwriter-main/.workbuddy/skills/luozhenyu-bookwriter/LICENSE)

---

## 感谢

https://linux.do 佬友支持
