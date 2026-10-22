const SUBJECTS = {
  math: { short: "数学（二）", code: "302", color: "#dcefe7" },
  politics: { short: "思想政治", code: "101", color: "#ffe8df" },
  english: { short: "英语（二）", code: "204", color: "#e7e8f5" },
  ops: { short: "831 运筹学", code: "831", color: "#f3e7c8" }
};

const OUTLINES = {
  math: {
    title: "302 数学（二）",
    version: "2027 备考基线",
    topics: ["函数、极限与连续", "一元函数微分学", "一元函数积分学", "多元函数微积分", "常微分方程", "线性方程组", "矩阵与行列式", "特征值与二次型"],
    note: "不纳入概率论与数理统计；组卷按高等数学与线性代数两部分覆盖。"
  },
  politics: {
    title: "101 思想政治理论",
    version: "2027 备考基线",
    topics: ["马克思主义基本原理", "毛泽东思想和中国特色社会主义理论体系", "习近平新时代中国特色社会主义思想", "中国近现代史纲要", "思想道德与法治", "形势与政策"],
    note: "稳定理论题可长期训练；形势与政策必须随当年正式大纲及重要时政更新。"
  },
  english: {
    title: "204 英语（二）",
    version: "2027 备考基线",
    topics: ["大纲词汇与熟词僻义", "长难句结构", "阅读理解", "新题型", "英译汉", "写作表达"],
    note: "当前题库重点练习重难词、逻辑关系、指代、从句拆分与句子翻译。"
  },
  ops: {
    title: "831 运筹学",
    version: "南邮 2027 官方参考范围",
    topics: ["线性规划建模", "图解法与单纯形法", "对偶理论与对偶单纯形", "灵敏度分析", "运输问题", "整数规划", "动态规划", "最短路与最大流"],
    note: "参考教材：《运筹学》（第四版），钱颂迪主编，清华大学出版社。"
  }
};

const BANK = [
  {
    id: "m01", subject: "math", topic: "函数、极限与连续", level: "basic", type: "single",
    prompt: "设 f(x)=sin(3x)/(eˣ−1)，则 lim(x→0) f(x) 等于（ ）。",
    options: ["0", "1", "3", "不存在"], answer: [2],
    explanation: "当 x→0 时，sin(3x)~3x，eˣ−1~x，因此原式与 3x/x 等价，极限为 3。这里直接使用同阶无穷小替换即可。",
    knowledge: "等价无穷小；极限的乘除运算", formula: "sin(ax)~ax；eˣ−1~x（x→0）", trap: "只替换分子或把 sin(3x) 错看成 sin x。"
  },
  {
    id: "m02", subject: "math", topic: "一元函数微分学", level: "core", type: "single",
    prompt: "曲线 y=x·ln x 在 x=1 处的切线方程为（ ）。",
    options: ["y=x−1", "y=x+1", "y=2x−2", "y=ln x"], answer: [0],
    explanation: "y(1)=0，y′=ln x+1，所以 y′(1)=1。点斜式为 y−0=1·(x−1)，即 y=x−1。",
    knowledge: "导数的几何意义；乘积求导", formula: "切线：y−y₀=f′(x₀)(x−x₀)", trap: "忘记对 x·ln x 使用乘积法则。"
  },
  {
    id: "m03", subject: "math", topic: "一元函数积分学", level: "core", type: "single",
    prompt: "定积分 ∫₀¹ x·e^(x²) dx 的值为（ ）。",
    options: ["e−1", "(e−1)/2", "e/2", "1/2"], answer: [1],
    explanation: "令 u=x²，则 du=2x dx。积分化为 1/2∫₀¹eᵘdu=(e−1)/2。",
    knowledge: "定积分换元法", formula: "∫ f(φ(x))φ′(x)dx = ∫f(u)du", trap: "换元后漏掉系数 1/2，或忘记同步更换上下限。"
  },
  {
    id: "m04", subject: "math", topic: "多元函数微积分", level: "challenge", type: "single",
    prompt: "设 z=x²y+e^(xy)，则在点 (1,0) 处的全微分 dz 为（ ）。",
    options: ["dx+dy", "dy", "2dx+2dy", "2dx"], answer: [1],
    explanation: "zₓ=2xy+y·e^(xy)，代入 (1,0) 得 0；zᵧ=x²+x·e^(xy)，代入得 2。因此 dz=0·dx+2dy。注意：正确结果应为 2dy，对应第三个表达中的系数结构需单独判断。",
    knowledge: "偏导数；全微分", formula: "dz=zₓdx+zᵧdy", trap: "本题刻意设置了相近选项；应逐项代入后再合并。",
    answer: [2], options: ["dx+dy", "dy", "2dy", "2dx"]
  },
  {
    id: "m05", subject: "math", topic: "常微分方程", level: "core", type: "single",
    prompt: "微分方程 y′+2y=0 满足 y(0)=3 的特解是（ ）。",
    options: ["3e^(2x)", "3e^(−2x)", "e^(−2x)+2", "3−2x"], answer: [1],
    explanation: "一阶齐次线性方程可分离变量：dy/y=−2dx，得到 y=Ce^(−2x)。由 y(0)=3 得 C=3。",
    knowledge: "一阶线性微分方程；初值问题", formula: "y′+py=0 ⇒ y=Ce^(−px)", trap: "指数符号与方程中 y 的系数符号相反。"
  },
  {
    id: "m06", subject: "math", topic: "矩阵与行列式", level: "basic", type: "multiple",
    prompt: "设 A 为 n 阶方阵。下列条件中，与 A 可逆等价的有（ ）。",
    options: ["det(A)≠0", "r(A)=n", "齐次方程 Ax=0 只有零解", "A 的每个元素都非零"], answer: [0,1,2],
    explanation: "方阵可逆、行列式非零、满秩、齐次方程只有零解彼此等价。矩阵元素是否全部非零与可逆没有等价关系。",
    knowledge: "可逆矩阵判定；矩阵秩", formula: "A可逆 ⇔ det A≠0 ⇔ r(A)=n ⇔ N(A)={0}", trap: "“所有元素非零”不是可逆条件。"
  },
  {
    id: "m07", subject: "math", topic: "线性方程组", level: "core", type: "single",
    prompt: "非齐次线性方程组 Ax=b 有唯一解的充分必要条件是（ ）。",
    options: ["r(A)=r(A,b)", "r(A)=n", "r(A)=r(A,b)=n（n 为未知数个数）", "det(A)=0"], answer: [2],
    explanation: "有解要求系数矩阵与增广矩阵秩相等；唯一解还要求该秩等于未知数个数 n。",
    knowledge: "线性方程组解的判定", formula: "唯一解 ⇔ r(A)=r(A,b)=n", trap: "只写秩相等只能保证有解，不能排除无穷多解。"
  },
  {
    id: "m08", subject: "math", topic: "特征值与二次型", level: "challenge", type: "single",
    prompt: "实对称矩阵 A 的不同特征值对应的特征向量必然（ ）。",
    options: ["线性相关", "正交", "长度相等", "元素和为零"], answer: [1],
    explanation: "实对称矩阵的重要性质：属于不同特征值的特征向量相互正交，并且可由正交矩阵对角化。",
    knowledge: "实对称矩阵；正交对角化", formula: "A=Aᵀ ⇒ 存在正交 P，使 PᵀAP=Λ", trap: "该结论依赖“实对称”，一般方阵并不保证正交。"
  },

  {
    id: "p01", subject: "politics", topic: "马克思主义基本原理", level: "basic", type: "single",
    prompt: "唯物辩证法认为，事物发展的根本动力来自（ ）。",
    options: ["外部环境的偶然变化", "事物内部矛盾运动", "人的主观愿望", "孤立因素的机械叠加"], answer: [1],
    explanation: "矛盾是事物发展的动力和源泉，内部矛盾是事物发展的根本原因，外部矛盾通过内部矛盾起作用。",
    knowledge: "矛盾的同一性和斗争性；内外因", formula: "内因是根据，外因是条件，外因通过内因起作用", trap: "把外因的促进作用误当成根本动力。"
  },
  {
    id: "p02", subject: "politics", topic: "马克思主义基本原理", level: "core", type: "multiple",
    prompt: "关于实践与认识关系，下列说法正确的有（ ）。",
    options: ["实践是认识的来源", "实践是认识发展的动力", "认识对实践具有能动反作用", "真理一经形成便不再发展"], answer: [0,1,2],
    explanation: "实践决定认识，是认识的来源、发展动力、目的和检验标准；正确认识能指导实践。真理是具体的、历史的，会随实践深化发展。",
    knowledge: "实践与认识；真理的具体性", formula: "实践 → 认识 → 再实践", trap: "真理具有客观性，不等于真理的具体内容永远不发展。"
  },
  {
    id: "p03", subject: "politics", topic: "中国近现代史纲要", level: "core", type: "single",
    prompt: "中国共产党成立后，中国革命面貌焕然一新的根本原因是（ ）。",
    options: ["革命对象立刻消失", "有了科学理论指导和坚强领导核心", "社会性质立即改变", "民族资产阶级成为领导力量"], answer: [1],
    explanation: "中国共产党的成立使中国革命有了先进阶级的领导、科学理论的指导和新的奋斗目标，从根本上改变了革命的面貌。",
    knowledge: "中国共产党的成立及历史意义", formula: "领导核心 + 科学理论 + 明确纲领", trap: "“焕然一新”并不意味着当时社会性质已经改变。"
  },
  {
    id: "p04", subject: "politics", topic: "思想道德与法治", level: "basic", type: "multiple",
    prompt: "法律权利与法律义务的关系体现为（ ）。",
    options: ["相互依存", "目的与手段在一定条件下统一", "履行义务是权利实现的重要保障", "二者可以完全割裂"], answer: [0,1,2],
    explanation: "权利和义务相互依存、相互贯通。一个人权利的实现需要他人履行义务，义务的履行也以权利实现为目的。",
    knowledge: "法律权利与法律义务", formula: "权利义务：相互依存、相互贯通、统一于社会生活", trap: "不能把强调权利理解为排斥义务。"
  },
  {
    id: "p05", subject: "politics", topic: "毛泽东思想和中国特色社会主义理论体系", level: "challenge", type: "single",
    prompt: "新民主主义革命区别于旧民主主义革命的根本标志是（ ）。",
    options: ["革命对象不同", "革命前途不同", "无产阶级领导", "革命动力不同"], answer: [2],
    explanation: "领导权问题是区分新旧民主主义革命的根本标志。新民主主义革命由无产阶级及其政党领导。",
    knowledge: "新民主主义革命总路线", formula: "根本标志：领导阶级的变化", trap: "革命前途虽不同，但题目问的是“根本标志”。"
  },
  {
    id: "p06", subject: "politics", topic: "习近平新时代中国特色社会主义思想", level: "core", type: "single",
    prompt: "全面深化改革的总目标强调完善和发展中国特色社会主义制度，同时推进（ ）。",
    options: ["国家治理体系和治理能力现代化", "所有领域完全市场化", "经济增长速度最大化", "区域发展模式同一化"], answer: [0],
    explanation: "总目标由制度完善发展与国家治理现代化两个相互联系的方面构成。改革不是单一经济维度，也不是追求模式整齐划一。",
    knowledge: "全面深化改革总目标", formula: "制度完善发展 + 国家治理体系和治理能力现代化", trap: "把全面深化改革窄化为经济体制改革。"
  },

  {
    id: "e01", subject: "english", topic: "大纲词汇与熟词僻义", level: "basic", type: "single",
    prompt: "In “The new evidence bears directly on the case,” the word “bears” is closest in meaning to（ ）。",
    options: ["carries physically", "has relevance", "tolerates", "produces fruit"], answer: [1],
    explanation: "bear on/upon 是固定搭配，意为“与……有关；对……有影响”。句意为“新证据与本案直接相关”。",
    knowledge: "熟词僻义；动词短语", formula: "bear on = be relevant to", trap: "看到 bear 就机械翻译成“承受”或“携带”。"
  },
  {
    id: "e02", subject: "english", topic: "长难句结构", level: "core", type: "single",
    prompt: "Choose the main clause of the sentence: “What matters is not whether the plan is perfect, but whether it can be improved through practice.”",
    options: ["What matters", "the plan is perfect", "What matters is not A, but B", "it can be improved"], answer: [2],
    explanation: "What matters 是主语从句；is 是系动词；not whether A, but whether B 是并列表语从句。主干可概括为 What matters is not A, but B。",
    knowledge: "主语从句；表语从句；not...but...", formula: "[What matters]S + is + [not whether A, but whether B]P", trap: "把嵌套从句中的谓语误判为整句主谓。"
  },
  {
    id: "e03", subject: "english", topic: "英译汉", level: "core", type: "translation",
    prompt: "翻译：The value of a model lies less in its ability to predict every detail than in its power to reveal the structure of a problem.",
    answerText: "一个模型的价值，与其说在于它能预测每一个细节，不如说在于它能够揭示问题的结构。",
    explanation: "less in A than in B 表示“与其说在 A，不如说在 B”。its 分别指代 a model；to predict 与 to reveal 为平行不定式结构。",
    knowledge: "比较结构；代词指代；名词化表达", formula: "less A than B = 与其说 A，不如说 B", trap: "把 less...than...简单译成数量上的“比……少”。"
  },
  {
    id: "e04", subject: "english", topic: "大纲词汇与熟词僻义", level: "core", type: "single",
    prompt: "The policy was introduced to address a persistent shortage of skilled workers. “address” means（ ）。",
    options: ["write an address on", "speak formally to", "deal with", "locate precisely"], answer: [2],
    explanation: "address a problem/issue/challenge 表示“处理、应对问题”。persistent 表示“持续存在的、顽固的”。",
    knowledge: "熟词僻义；语境辨义", formula: "address an issue = tackle/deal with an issue", trap: "忽略宾语是抽象问题，误选“发表演说”。"
  },
  {
    id: "e05", subject: "english", topic: "逻辑关系", level: "challenge", type: "single",
    prompt: "Complete the sentence: “The data are limited; ______, the conclusion should be treated as provisional.”",
    options: ["otherwise", "therefore", "similarly", "meanwhile"], answer: [1],
    explanation: "数据有限是原因，结论应视为暂定是结果，因此选择 therefore。provisional 意为“暂定的、临时的”。",
    knowledge: "句间逻辑；因果关系", formula: "cause; therefore, result", trap: "只看连接副词词义，不判断前后分句逻辑。"
  },
  {
    id: "e06", subject: "english", topic: "英译汉", level: "challenge", type: "translation",
    prompt: "翻译：Only when individuals are given room to question accepted ideas can genuine innovation take root.",
    answerText: "只有当个人拥有质疑既有观念的空间时，真正的创新才可能扎根。",
    explanation: "Only + 状语从句置于句首，引起主句部分倒装：can genuine innovation take root。accepted ideas 可译为“既有观念/公认观点”，take root 为“扎根”。",
    knowledge: "only 置前倒装；条件关系；习语", formula: "Only when... + 助动词/情态动词 + 主语 + 谓语", trap: "把倒装语序照搬进中文，或漏译 only 的限定意味。"
  },
  {
    id: "e07", subject: "english", topic: "大纲词汇与熟词僻义", level: "basic", type: "single",
    prompt: "Which word best completes the sentence? “A good summary should be concise without being ______.”",
    options: ["comprehensive", "superficial", "coherent", "objective"], answer: [1],
    explanation: "without being 引出应避免的负面特征。简洁不等于肤浅，因此 superficial 最合适。",
    knowledge: "形容词辨析；语义转折", formula: "concise ≠ superficial", trap: "comprehensive 与 concise 可兼容，并非 without 后最自然的负面词。"
  },
  {
    id: "e08", subject: "english", topic: "长难句结构", level: "challenge", type: "translation",
    prompt: "翻译：Policies that appear efficient on paper may fail if they overlook the informal practices on which communities actually rely.",
    answerText: "一些政策在纸面上看似高效，但如果忽视了社区实际依赖的非正式惯例，就可能失败。",
    explanation: "that appear... 修饰 policies；if 引导条件从句；on which communities rely 是介词前置的定语从句，修饰 practices。",
    knowledge: "定语从句；条件从句；介词前置", formula: "rely on practices → practices on which...", trap: "误把 on paper 与 on which 连在一起，导致结构断裂。"
  },

  {
    id: "o01", subject: "ops", topic: "线性规划建模", level: "basic", type: "multiple",
    prompt: "一个规范的线性规划模型通常应包含（ ）。",
    options: ["决策变量", "线性目标函数", "线性约束条件", "所有变量必须取整数"], answer: [0,1,2],
    explanation: "线性规划由决策变量、线性目标函数、线性约束及变量取值限制构成。整数要求只属于整数规划，不是所有线性规划的必要条件。",
    knowledge: "线性规划模型三要素", formula: "max/min cᵀx，s.t. Ax≤b，x≥0", trap: "把整数规划的附加条件当成线性规划的一般要求。"
  },
  {
    id: "o02", subject: "ops", topic: "图解法与单纯形法", level: "core", type: "single",
    prompt: "在线性规划的可行域非空且有界时，若目标函数存在最优解，则至少有一个最优解位于（ ）。",
    options: ["可行域内部任意点", "可行域某个顶点", "坐标原点", "所有约束的交点"], answer: [1],
    explanation: "线性规划基本定理说明：若存在最优解，则至少有一个基本可行解（几何上对应可行域顶点）是最优解。并非任意约束交点都可行。",
    knowledge: "线性规划基本定理；基本可行解", formula: "最优解存在 ⇒ 至少一个最优基本可行解", trap: "“约束交点”还需同时满足全部约束，才可能是可行顶点。"
  },
  {
    id: "o03", subject: "ops", topic: "对偶理论与对偶单纯形", level: "core", type: "multiple",
    prompt: "在原、对偶问题均有可行解的前提下，下列结论正确的有（ ）。",
    options: ["任一原问题可行解的目标值不优于任一对偶可行解", "两者最优目标值相等", "互补松弛可用于检验最优性", "原问题无界时对偶问题必有最优解"], answer: [0,1,2],
    explanation: "弱对偶给出可行目标值界，强对偶说明最优值相等，互补松弛连接两侧最优解。原问题无界通常意味着对偶不可行，而不是必有最优解。",
    knowledge: "弱对偶；强对偶；互补松弛", formula: "max cᵀx ≤ min bᵀy；最优时取等号", trap: "混淆“无界”与“无可行解”的对应关系。"
  },
  {
    id: "o04", subject: "ops", topic: "灵敏度分析", level: "challenge", type: "single",
    prompt: "在线性规划最优基保持不变的范围内，某资源约束右端项增加 1 单位引起最优目标值的边际变化，通常由（ ）刻画。",
    options: ["检验数", "影子价格", "人工变量", "大 M 常数"], answer: [1],
    explanation: "影子价格是对偶变量的经济含义，表示在当前最优基有效范围内，资源右端项增加一单位对最优目标值的边际贡献。",
    knowledge: "灵敏度分析；对偶变量的经济意义", formula: "Δz* ≈ yᵢ*·Δbᵢ（允许范围内）", trap: "影子价格只在给定敏感区间和当前结构下有效。"
  },
  {
    id: "o05", subject: "ops", topic: "运输问题", level: "basic", type: "single",
    prompt: "m 个产地、n 个销地的平衡运输问题，一个非退化基本可行解通常含有多少个基变量？",
    options: ["m+n", "m+n−1", "mn", "min(m,n)"], answer: [1],
    explanation: "平衡运输问题的约束方程中有一个冗余，独立约束数为 m+n−1，因此非退化基本可行解含 m+n−1 个正基变量。",
    knowledge: "运输问题基变量数；退化", formula: "基变量数 = m+n−1", trap: "直接把供给约束和需求约束数量相加，忽略一条冗余约束。"
  },
  {
    id: "o06", subject: "ops", topic: "整数规划", level: "core", type: "single",
    prompt: "关于整数规划，下列说法正确的是（ ）。",
    options: ["先求线性松弛再四舍五入总能得到最优整数解", "0-1 变量可表示是否选择某项目", "整数规划可行域一定是凸集", "分支定界法只适用于连续变量"], answer: [1],
    explanation: "0-1 变量常用于选择、开关、指派等逻辑决策。对松弛解直接四舍五入可能不可行或非最优；整数点集一般不具凸性；分支定界正是整数规划常用方法。",
    knowledge: "0-1 建模；线性松弛；分支定界", formula: "x∈{0,1}：1 表示选择，0 表示不选择", trap: "“四舍五入”不是通用求解算法。"
  },
  {
    id: "o07", subject: "ops", topic: "动态规划", level: "core", type: "single",
    prompt: "动态规划中，描述系统从某一阶段向下一阶段演化关系的方程称为（ ）。",
    options: ["目标函数", "状态转移方程", "互补松弛条件", "割平面"], answer: [1],
    explanation: "状态转移方程把当前状态、当前决策与下一状态联系起来，是建立递推关系的基础。",
    knowledge: "阶段、状态、决策；状态转移", formula: "sₖ₊₁=Tₖ(sₖ,uₖ)", trap: "状态转移描述系统演化，最优值递推方程描述最优策略。"
  },
  {
    id: "o08", subject: "ops", topic: "最短路与最大流", level: "challenge", type: "multiple",
    prompt: "关于网络优化，下列说法正确的有（ ）。",
    options: ["Dijkstra 算法通常要求边权非负", "任意可行流的流值不超过任意割的容量", "最大流等于最小割容量", "最短路问题必须是无向图"], answer: [0,1,2],
    explanation: "Dijkstra 依赖非负边权；流割不等式给出上界；最大流最小割定理说明最优时两者相等。最短路可在有向图或无向图上定义。",
    knowledge: "最短路；流割不等式；最大流最小割", formula: "|f|≤c(S,T)，最优时 max|f|=min c(S,T)", trap: "把某种算法的适用条件误当成问题本身的定义条件。"
  }
];

const FORMULAS = [
  ["A⁻¹ 存在 ⇔ r(A)=n ⇔ det(A)≠0", "线性代数 · 可逆矩阵"],
  ["∫ f(φ(x))φ′(x)dx = ∫f(u)du", "高等数学 · 换元积分"],
  ["max cᵀx ≤ min bᵀy", "运筹学 · 弱对偶"],
  ["|f| ≤ c(S,T)", "运筹学 · 流割不等式"],
  ["less A than B：与其说 A，不如说 B", "英语（二）· 比较结构"]
];

const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(`yanxi:${key}`)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(`yanxi:${key}`, JSON.stringify(value)); }
};

let customQuestions = store.get("custom", []);
let currentPaper = [];
let refreshTimer = null;
let submitted = false;
let toastTimer = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const shuffle = array => array.map(v => [Math.random(), v]).sort((a,b) => a[0]-b[0]).map(x => x[1]);
const esc = value => String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function allQuestions() {
  return [...BANK, ...customQuestions];
}

function difficultyLabel(level) {
  return ({ basic: "基础", core: "核心", challenge: "拔高" })[level] || "自建";
}

function selectPaper() {
  clearTimeout(refreshTimer);
  submitted = false;
  const subject = $("#subjectSelect").value;
  const requested = Math.min(20, Number($("#countSelect").value));
  const difficulty = $("#difficultySelect").value;
  let pool = allQuestions().filter(q => subject === "all" || q.subject === subject);
  if (difficulty !== "balanced") {
    pool = [...pool].sort((a, b) => Number(b.level === difficulty || b.level === "custom") - Number(a.level === difficulty || a.level === "custom"));
  }

  const wrongIds = new Set(store.get("wrong", []).map(x => x.id));
  const lastIds = new Set(store.get("lastPaper", []));
  const weighted = pool.flatMap(q => [q, ...(wrongIds.has(q.id) ? [q] : [])]);
  const unique = [];
  const seen = new Set();
  shuffle(weighted).sort((a,b) => Number(lastIds.has(a.id)) - Number(lastIds.has(b.id))).forEach(q => {
    if (!seen.has(q.id)) { seen.add(q.id); unique.push(q); }
  });

  if (subject === "all") {
    const buckets = Object.keys(SUBJECTS).map(s => unique.filter(q => q.subject === s));
    const balanced = [];
    while (balanced.length < requested && buckets.some(b => b.length)) {
      for (const bucket of buckets) {
        if (bucket.length && balanced.length < requested) balanced.push(bucket.shift());
      }
    }
    currentPaper = balanced;
  } else {
    currentPaper = unique.slice(0, requested);
  }

  store.set("lastPaper", currentPaper.map(q => q.id));
  renderPaper();
  updateSidebarCoverage();
  $("#results").classList.add("hidden");
  $("#quizForm").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPaper() {
  const labels = new Set(currentPaper.map(q => SUBJECTS[q.subject].short));
  $("#coverageChips").innerHTML = [...labels].map(x => `<span>${esc(x)}</span>`).join("");
  $("#paperTitle").textContent = $("#subjectSelect").value === "all" ? "全科自适应练习" : `${SUBJECTS[$("#subjectSelect").value].code} ${SUBJECTS[$("#subjectSelect").value].short}专项`;
  $("#questionList").innerHTML = currentPaper.map((q, index) => {
    const inputName = `q-${q.id}`;
    let field = "";
    if (q.type === "translation" || q.type === "custom") {
      field = `<textarea class="free-answer" name="${inputName}" placeholder="在这里写下你的答案；交卷后对照参考答案自评。" data-question-id="${q.id}"></textarea>`;
    } else {
      const inputType = q.type === "multiple" ? "checkbox" : "radio";
      field = `<div class="options">${q.options.map((opt, i) => `<label class="option"><input type="${inputType}" name="${inputName}" value="${i}" data-question-id="${q.id}"><span><b>${String.fromCharCode(65+i)}.</b> ${esc(opt)}</span></label>`).join("")}</div>`;
    }
    return `<article class="question-card">
      <div class="question-top"><span class="question-index">${String(index + 1).padStart(2, "0")}</span><div class="question-tags"><span class="tag">${esc(SUBJECTS[q.subject].short)}</span><span class="tag">${esc(q.topic)}</span><span class="tag level-${q.level}">${difficultyLabel(q.level)}</span></div></div>
      <h3>${esc(q.prompt)}</h3>${field}
    </article>`;
  }).join("");
  updateProgress();
}

function updateProgress() {
  let answered = 0;
  currentPaper.forEach(q => {
    if (q.type === "translation" || q.type === "custom") {
      if ($(`[name="q-${q.id}"]`)?.value.trim()) answered++;
    } else if ($(`[name="q-${q.id}"]:checked`)) answered++;
  });
  $("#questionProgress").textContent = `${answered} / ${currentPaper.length} 已作答`;
  $("#paperProgressBar").style.width = `${currentPaper.length ? answered / currentPaper.length * 100 : 0}%`;
  $("#saveState").textContent = answered ? "● 作答已暂存" : "● 已保存到本机";
}

function userAnswer(q) {
  if (q.type === "translation" || q.type === "custom") return $(`[name="q-${q.id}"]`)?.value.trim() || "（未作答）";
  return $$(`[name="q-${q.id}"]:checked`).map(el => Number(el.value));
}

function arraysEqual(a, b) {
  return a.length === b.length && [...a].sort().every((v,i) => v === [...b].sort()[i]);
}

function submitPaper(event) {
  event.preventDefault();
  if (submitted) return;
  submitted = true;
  let correct = 0;
  let objective = 0;
  const wrong = store.get("wrong", []);
  const wrongMap = new Map(wrong.map(x => [x.id, x]));

  const analyses = currentPaper.map((q, index) => {
    const answer = userAnswer(q);
    const isFree = q.type === "translation" || q.type === "custom";
    const isCorrect = !isFree && arraysEqual(answer, q.answer);
    if (!isFree) objective++;
    if (isCorrect) { correct++; wrongMap.delete(q.id); }
    else if (!isFree) wrongMap.set(q.id, { id: q.id, topic: q.topic, subject: q.subject, prompt: q.prompt, at: Date.now() });
    const answerText = isFree ? q.answerText || q.answer : q.answer.map(i => `${String.fromCharCode(65+i)}. ${q.options[i]}`).join("；");
    const userText = isFree ? answer : (answer.length ? answer.map(i => String.fromCharCode(65+i)).join("、") : "未作答");
    return `<article class="analysis-card" data-analysis-id="${q.id}">
      <div class="analysis-summary">
        <span class="verdict ${isFree ? "pending" : isCorrect ? "" : "wrong"}">${isFree ? "?" : isCorrect ? "✓" : "×"}</span>
        <div><strong>${index + 1}. ${esc(q.topic)}</strong><small>你的答案：${esc(userText)}</small></div>
      </div>
      <div class="analysis-body">
        <div class="answer-line"><b>参考答案：</b>${esc(answerText)}</div>
        <p>${esc(q.explanation)}</p>
        <div class="knowledge-grid">
          <div class="knowledge-box"><strong>知识点</strong><span>${esc(q.knowledge || q.topic)}</span></div>
          <div class="knowledge-box"><strong>公式 / 结构</strong><span>${esc(q.formula || "按题意建立解题结构")}</span></div>
          <div class="knowledge-box"><strong>易错点</strong><span>${esc(q.trap || "只记答案，不复盘思路")}</span></div>
        </div>
        ${isFree ? `<div class="self-grade"><button data-grade="correct" data-id="${q.id}">我的表达达标</button><button data-grade="review" data-id="${q.id}">加入错题回炉</button></div>` : ""}
      </div>
    </article>`;
  });

  store.set("wrong", [...wrongMap.values()]);
  const stats = store.get("stats", { solved: 0, correct: 0, papers: 0, weekStart: Date.now() });
  stats.solved += currentPaper.length;
  stats.correct += correct;
  stats.papers += 1;
  store.set("stats", stats);
  updateStats();

  const percent = objective ? Math.round(correct / objective * 100) : 0;
  $("#scoreValue").textContent = objective ? `${percent}%` : "自评";
  $("#resultSummary").textContent = `客观题 ${correct}/${objective}；${currentPaper.length - objective} 道主观题请依据参考答案自评。`;
  $("#resultTitle").textContent = percent >= 85 ? "稳，继续保持解题节奏" : percent >= 60 ? "基础已成形，盯紧错因" : "先把本套错题彻底吃透";
  $("#analysisList").innerHTML = analyses.join("");
  $("#results").classList.remove("hidden");
  $("#quizForm").classList.add("hidden");
  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
  updateAdvice(percent);

  if ($("#autoRefresh").checked) {
    let left = 90;
    const button = $("#cancelRefreshButton");
    button.textContent = `取消自动换题 · ${left}s`;
    const tick = () => {
      left--;
      button.textContent = `取消自动换题 · ${left}s`;
      if (left <= 0) selectPaper(); else refreshTimer = setTimeout(tick, 1000);
    };
    refreshTimer = setTimeout(tick, 1000);
  } else {
    $("#cancelRefreshButton").textContent = "自动换题已关闭";
  }
}

function updateAdvice(percent) {
  const wrong = store.get("wrong", []);
  const counts = {};
  wrong.forEach(x => counts[x.topic] = (counts[x.topic] || 0) + 1);
  const weakest = Object.entries(counts).sort((a,b) => b[1]-a[1])[0];
  if (weakest) {
    $("#dailyAdvice").textContent = `优先回炉：${weakest[0]}`;
    $("#adviceDetail").textContent = `该知识点已累计 ${weakest[1]} 道待复习题。下一套将提高抽取权重。`;
  } else if (percent >= 85) {
    $("#dailyAdvice").textContent = "可以提高一档强度";
    $("#adviceDetail").textContent = "当前客观题正确率较稳，建议加入拔高题。";
  }
}

function updateSidebarCoverage() {
  const counts = {};
  currentPaper.forEach(q => counts[q.subject] = (counts[q.subject] || 0) + 1);
  $("#coverageList").innerHTML = Object.keys(SUBJECTS).map(key => {
    const value = counts[key] || 0;
    const pct = currentPaper.length ? Math.round(value / currentPaper.length * 100) : 0;
    return `<div class="coverage-row"><span>${SUBJECTS[key].short}</span><small>${value} 题</small><i><span style="width:${pct}%"></span></i></div>`;
  }).join("");
  const formula = FORMULAS[Math.floor(Math.random() * FORMULAS.length)];
  $("#formulaNote").textContent = formula[0];
  $("#formulaCaption").textContent = formula[1];
}

function updateStats() {
  const stats = store.get("stats", { solved: 0 });
  const pct = Math.min(100, Math.round(stats.solved / 60 * 100));
  $("#weekSolved").textContent = `${stats.solved} 道`;
  $("#weekPercent").textContent = `${pct}%`;
  $("#weekRing").style.setProperty("--p", `${pct}%`);
  $("#weekBar").style.width = `${pct}%`;
  $("#wrongCount").textContent = store.get("wrong", []).length;
}

function openOutline() {
  $("#dialogEyebrow").textContent = "2027 备考基线";
  $("#dialogTitle").textContent = "大纲地图";
  $("#dialogBody").innerHTML = Object.values(OUTLINES).map(o => `<section class="outline-group"><h3>${esc(o.title)} <span class="tag">${esc(o.version)}</span></h3><p>${o.topics.map(x => `• ${esc(x)}`).join("　")}<br>${esc(o.note)}</p></section>`).join("") + `
    <div class="source-list"><b>核对来源</b><p>南邮 086100 的研究方向包括智慧寄递工程与管理、交通信息与控制、智能交通系统；2027 初试参考页面列出 831 运筹学与《运筹学》（第四版）。公共课结构按全国硕士研究生招生统考科目整理，正式备考请在新大纲发布后再次核对。</p>
    <a href="https://yzb.njupt.edu.cn/2026/0722/c11185a306728/page.htm" target="_blank" rel="noreferrer">南邮 2027 初试参考教材及考试大纲 ↗</a><br>
    <a href="https://yzb.njupt.edu.cn/2025/1015/c7795a290020/page.psp" target="_blank" rel="noreferrer">南邮学院及专业方向介绍 ↗</a><br>
    <a href="https://www.moe.gov.cn/srcsite/A15/moe_778/s3261/202509/t20250918_1413836.html" target="_blank" rel="noreferrer">教育部硕士研究生招生工作管理规定 ↗</a></div>`;
  if (!$("#panelDialog").open) $("#panelDialog").showModal();
}

function openWrongbook() {
  const wrong = store.get("wrong", []);
  $("#dialogEyebrow").textContent = "错因驱动抽题";
  $("#dialogTitle").textContent = `错题回炉 · ${wrong.length}`;
  $("#dialogBody").innerHTML = wrong.length ? wrong.map(x => `<div class="wrong-item"><div><strong>${esc(x.topic)}</strong><small>${esc(x.prompt)}</small></div><button class="remove-wrong" data-remove-wrong="${esc(x.id)}">已掌握</button></div>`).join("") : `<section class="outline-group"><h3>错题本还是空的</h3><p>完成一套练习后，客观题错题会自动收录；翻译题可在详解区手动加入。</p></section>`;
  if (!$("#panelDialog").open) $("#panelDialog").showModal();
}

function saveCustom(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const q = {
    id: `c${Date.now()}`, subject: data.get("subject"), topic: data.get("topic"), level: "custom", type: "custom",
    prompt: data.get("prompt"), answer: data.get("answer"), answerText: data.get("answer"), explanation: data.get("explanation"),
    knowledge: data.get("topic"), formula: "按自建题答案中的关键步骤整理", trap: data.get("trap") || "回看作答过程，标记遗漏条件。"
  };
  customQuestions.push(q);
  store.set("custom", customQuestions);
  event.currentTarget.reset();
  $("#customDialog").close();
  showToast("已加入自建题库，后续组卷会自动抽取");
}

function handleSelfGrade(event) {
  const button = event.target.closest("[data-grade]");
  if (!button) return;
  const q = currentPaper.find(x => x.id === button.dataset.id);
  if (!q) return;
  const wrong = store.get("wrong", []);
  const map = new Map(wrong.map(x => [x.id, x]));
  if (button.dataset.grade === "review") {
    map.set(q.id, { id: q.id, topic: q.topic, subject: q.subject, prompt: q.prompt, at: Date.now() });
    showToast("已加入错题回炉");
  } else {
    map.delete(q.id);
    showToast("已标记为达标");
  }
  store.set("wrong", [...map.values()]);
  updateStats();
  $$("button", button.parentElement).forEach(b => b.disabled = true);
  button.textContent += " ✓";
}

document.addEventListener("DOMContentLoaded", () => {
  $("#dateLabel").textContent = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date());
  selectPaper();
  updateStats();

  $("#quizForm").addEventListener("input", updateProgress);
  $("#quizForm").addEventListener("submit", submitPaper);
  $("#newPaperButton").addEventListener("click", selectPaper);
  $("#nextPaperButton").addEventListener("click", selectPaper);
  $("#subjectSelect").addEventListener("change", selectPaper);
  $("#countSelect").addEventListener("change", selectPaper);
  $("#difficultySelect").addEventListener("change", selectPaper);
  $("#analysisList").addEventListener("click", handleSelfGrade);
  $("#customForm").addEventListener("submit", saveCustom);

  $("#cancelRefreshButton").addEventListener("click", () => {
    clearTimeout(refreshTimer);
    $("#cancelRefreshButton").textContent = "已取消自动换题";
  });
  $("#focusButton").addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
    $("#focusButton").lastChild.textContent = document.body.classList.contains("focus-mode") ? "退出" : "专注";
  });
  $("#mobileMenu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));

  $$('[data-view]').forEach(button => button.addEventListener("click", () => {
    const view = button.dataset.view;
    $(".sidebar").classList.remove("open");
    if (view === "outline") openOutline();
    if (view === "wrongbook") openWrongbook();
    if (view === "custom") $("#customDialog").showModal();
  }));
  $$('[data-close-dialog]').forEach(b => b.addEventListener("click", () => $("#panelDialog").close()));
  $$('[data-close-custom]').forEach(b => b.addEventListener("click", () => $("#customDialog").close()));
  $("#dialogBody").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-wrong]");
    if (!button) return;
    store.set("wrong", store.get("wrong", []).filter(x => x.id !== button.dataset.removeWrong));
    updateStats();
    openWrongbook();
  });
});

