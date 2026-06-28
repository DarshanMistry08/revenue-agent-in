# 🚀 RevenueAgent IN: Autonomous Risk Ingestion & Action Ledger Dashboard

> **Kaggle Vibe Coding Capstone — Agents for Business Track**

`RevenueAgent IN` is an enterprise-grade, autonomous financial risk management and collections orchestration system. It uses a simulated **Google ADK 2.0 Graph Architecture** to ingest Indian corporate client portfolios, evaluate pipeline and financial risks in real-time, trigger multi-channel communication sequences, and record every action in a live financial ledger.

Built for modern finance and sales operations teams managing high-value Indian corporate accounts (₹ INR).

---

## 🏗️ ADK 2.0 Agentic Workflow (DAG)

The following Mermaid.js diagram maps the complete autonomous decision-making and execution flow:

```mermaid
graph TD
    A[📥 Portfolio Data Ingestion] --> B[⚙️ ADK 2.0 Workflow Init]
    B --> C[🧠 AccountEvaluator Node]

    C -->|Evaluate Contact Recency & Deal Tier| D{Pipeline Risk?}
    C -->|Evaluate Payment Status| E{Financial Risk?}

    D -->|YES — Standard > 14 days / Premium > 5 days| F[⚠️ PipelineAlerter Node]
    D -->|NO — Contact Healthy| G[✅ Check Passed]

    E -->|YES — Status is Overdue| H[🚨 FinancialAlerter Node]
    E -->|NO — Status is Paid/Pending| I[✅ Check Passed]

    F --> J[📋 Action: CRM Follow-up Task Raised]
    H --> K[📱 Twilio SMS API — Payment Link Dispatched]
    H --> L[💬 WhatsApp Business API — Transaction Reminder]
    H --> M[📞 IVR Outbound Voice Call Sequence Triggered]

    J --> N[📝 ReportingAgent Node]
    K --> N
    L --> N
    M --> N
    G --> N
    I --> N

    N --> O[💻 UI Update: Correspondence Hub + Transaction Ledger]
    O --> P([🏁 Workflow Complete])

    style A fill:#1f2937,stroke:#3b82f6,color:#fff
    style C fill:#1f2937,stroke:#a855f7,color:#fff
    style F fill:#f59e0b,stroke:#f59e0b,color:#000
    style H fill:#ef4444,stroke:#ef4444,color:#fff
    style N fill:#10b981,stroke:#10b981,color:#fff
