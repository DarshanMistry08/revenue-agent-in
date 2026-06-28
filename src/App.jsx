import React, { useState, useEffect, useRef } from 'react';

// ==============================================================================
// INLINE SVG ICONS (For clean, zero-dependency, and high-performance UI)
// ==============================================================================
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Graph: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Plus: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
    </svg>
  ),
  Play: () => (
    <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Edit: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Mail: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
};

// Helper for Indian Currency Formatting
const formatINR = (value) => {
  return '₹' + Number(value).toLocaleString('en-IN');
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Master Client Dataset State
  const [accounts, setAccounts] = useState([
    { id: 1, client_name: "Tata Motors Ltd", deal_value: 7500000, days_since_last_contact: 18, payment_status: "Paid" },
    { id: 2, client_name: "Reliance Retail", deal_value: 15000000, days_since_last_contact: 5, payment_status: "Overdue" },
    { id: 3, client_name: "Infosys Technologies", deal_value: 9000000, days_since_last_contact: 4, payment_status: "Paid" },
    { id: 4, client_name: "Zomato Media", deal_value: 4500000, days_since_last_contact: 22, payment_status: "Overdue" }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'pipeline', client_name: 'Tata Motors Ltd', details: 'No contact for 18 days', timestamp: '10 mins ago', severity: 'warning' },
    { id: 2, type: 'financial', client_name: 'Reliance Retail', details: 'Invoice of ₹1,50,00,000 Overdue', timestamp: '8 mins ago', severity: 'danger' },
    { id: 3, type: 'pipeline', client_name: 'Zomato Media', details: 'No contact for 22 days', timestamp: '5 mins ago', severity: 'warning' },
    { id: 4, type: 'financial', client_name: 'Zomato Media', details: 'Invoice of ₹45,00,000 Overdue', timestamp: '5 mins ago', severity: 'danger' }
  ]);

  // Section 2: Account Transaction Ledger State (Credited vs Debited)
  const [ledger, setLedger] = useState([
    { id: 1, date: "2026-06-28", description: "Invoice Payment Cleared - Infosys Technologies", type: "Credited", amount: 9000000 },
    { id: 2, date: "2026-06-28", description: "Twilio SMS API Utility Fees", type: "Debited", amount: 1250 },
    { id: 3, date: "2026-06-27", description: "WhatsApp Business API Messaging Cost", type: "Debited", amount: 3400 },
    { id: 4, date: "2026-06-26", description: "Invoice Payment Cleared - Tata Motors Ltd", type: "Credited", amount: 7500000 },
    { id: 5, date: "2026-06-25", description: "AWS Lambda & EC2 Server Hosting", type: "Debited", amount: 18500 },
    { id: 6, date: "2026-06-24", description: "Google Vertex AI Model Inference Fees", type: "Debited", amount: 8900 }
  ]);

  // Section 1: Visual Correspondence Hub Database
  const [correspondence, setCorrespondence] = useState({
    "Tata Motors Ltd": [
      { id: 1, sender: "SENT (AI Agent)", subject: "Milestone Sync Request", body: "Dear Team, our system shows project milestone M3 is completed. Please schedule the review sync.", time: "2 days ago" },
      { id: 2, sender: "RECEIVED (Client Reply)", subject: "Re: Milestone Sync Request", body: "Hi, confirmed for Thursday 3 PM IST. Meeting link sent.", time: "1 day ago" }
    ],
    "Reliance Retail": [
      { id: 1, sender: "SENT (AI Agent)", subject: "Urgent Reminder: Invoice #RE-901 Overdue by 5 Days", body: "Dear Team, our system shows an outstanding balance of ₹1.5 Cr. Please process via RTGS today.", time: "Just now" },
      { id: 2, sender: "RECEIVED (Client Reply)", subject: "Re: Invoice #RE-901 Overdue", body: "Thanks for the reminder. Treasury team has initiated the RTGS transfer. Reference shared shortly.", time: "2 hours ago" }
    ],
    "Infosys Technologies": [
      { id: 1, sender: "SENT (AI Agent)", subject: "Invoice #INF-204 Dispatched", body: "Dear team, please find the attached invoice #INF-204 for June services.", time: "4 days ago" },
      { id: 2, sender: "RECEIVED (Client Reply)", subject: "Re: Invoice #INF-204 Dispatched", body: "Confirmed. Transaction cleared via net banking. Please check ledger credit.", time: "3 days ago" }
    ],
    "Zomato Media": [
      { id: 1, sender: "SENT (AI Agent)", subject: "Payment Collection Reminder - Invoice #ZOM-402", body: "Dear Finance team, this is an automated reminder that ₹45,00,000 remains unpaid.", time: "Just now" },
      { id: 2, sender: "RECEIVED (Client Reply)", subject: "Re: Payment Collection Reminder", body: "We are experiencing treasury delays. Processing payment via RTGS transfer today.", time: "3 hours ago" }
    ]
  });

  // Section 1: Interactive "Add Client" Form State
  const [newClient, setNewClient] = useState({
    client_name: '',
    deal_value: '',
    days_since_last_contact: '',
    payment_status: 'Paid'
  });

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Persistent Historical Audit Trail State
  const [historicalAuditTrail, setHistoricalAuditTrail] = useState([
    { date: "June 28", event: "ADK 2.0 initiated multi-channel collections sequence for Reliance Retail" },
    { date: "June 27", event: "Escalated critical payment delay for Zomato Media to Finance Operations" },
    { date: "June 26", event: "Verified NEFT payment of ₹90,00,000 from Infosys Technologies" },
    { date: "June 25", event: "Pipeline follow-up ticket raised for Tata Motors Ltd" }
  ]);

  // CRUD Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  // Graph Execution State
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [executionState, setExecutionState] = useState({
    status: 'idle', // 'idle', 'running', 'completed'
    currentNode: null,
    logs: [],
    nodeStates: {
      START: 'pending',
      AccountEvaluator: 'pending',
      PipelineAlerter: 'pending',
      FinancialAlerter: 'pending',
      ReportingAgent: 'pending'
    }
  });

  const terminalEndRef = useRef(null);

  // Auto-scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [executionState.logs]);

  // Trigger Toast Notification
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3500);
  };

  // Add Client Form Submission handler
  const handleAddClientSubmit = (e) => {
    e.preventDefault();
    if (!newClient.client_name || newClient.deal_value === '' || newClient.days_since_last_contact === '') {
      triggerToast("Please fill in all fields.", "danger");
      return;
    }

    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    const addedAccount = {
      id: newId,
      client_name: newClient.client_name,
      deal_value: Number(newClient.deal_value),
      days_since_last_contact: Number(newClient.days_since_last_contact),
      payment_status: newClient.payment_status
    };

    setAccounts([...accounts, addedAccount]);

    // Update Transaction Ledger if Status is Paid
    if (addedAccount.payment_status === 'Paid') {
      setLedger(prev => [
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          description: `Invoice Payment Cleared - ${addedAccount.client_name}`,
          type: "Credited",
          amount: addedAccount.deal_value
        },
        ...prev
      ]);
    }

    // Add default correspondence thread for the new client
    setCorrespondence(prev => ({
      ...prev,
      [addedAccount.client_name]: [
        { id: 1, sender: "SENT (AI Agent)", subject: "Account Activation & Onboarding", body: `Welcome to RevenueAgent. Portfolio initialized at ${formatINR(addedAccount.deal_value)}.`, time: "Just now" }
      ]
    }));

    // Add to Audit Trail
    setHistoricalAuditTrail(prev => [
      { date: "Today", event: `Added new client account: ${addedAccount.client_name} (Value: ${formatINR(addedAccount.deal_value)})` },
      ...prev
    ]);

    // Reset Form
    setNewClient({ client_name: '', deal_value: '', days_since_last_contact: '', payment_status: 'Paid' });
    triggerToast(`Successfully added ${addedAccount.client_name}!`);
  };

  // CRUD Actions
  const handleOpenEditModal = (account) => {
    setEditingAccount(account);
    setIsEditModalOpen(true);
  };

  const handleSaveEditAccount = () => {
    if (!editingAccount.client_name || editingAccount.deal_value === '' || editingAccount.days_since_last_contact === '') {
      triggerToast("Please fill in all fields.", "danger");
      return;
    }

    setAccounts(accounts.map(acc => acc.id === editingAccount.id ? {
      ...editingAccount,
      deal_value: Number(editingAccount.deal_value),
      days_since_last_contact: Number(editingAccount.days_since_last_contact)
    } : acc));

    setIsEditModalOpen(false);
    triggerToast(`Updated ${editingAccount.client_name} details.`);
  };

  const handleDeleteAccount = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setAccounts(accounts.filter(acc => acc.id !== id));
      triggerToast(`Removed ${name} from active database.`);
    }
  };

  // Send Manual Notification
  const handleSendManualReminder = (clientName) => {
    setCorrespondence(prev => ({
      ...prev,
      [clientName]: [
        ...(prev[clientName] || []),
        { id: Date.now(), sender: "SENT (AI Agent)", subject: "Urgent Payment Follow-up (Manual)", body: "This is a manual follow-up reminder regarding the outstanding invoice balance.", time: "Just now" }
      ]
    }));

    setHistoricalAuditTrail(prev => [
      { date: "Today", event: `Manual payment reminder dispatched to ${clientName}` },
      ...prev
    ]);

    triggerToast(`On-demand payment reminder payload forcefully dispatched to ${clientName}!`, "success");
  };

  // Tiered Urgency & Multi-Channel Logging inside ADK 2.0 Graph Simulation
  const runWorkflow = (account) => {
    setSelectedAccount(account);
    setExecutionState({
      status: 'running',
      currentNode: 'START',
      logs: [`[INFO] Starting ADK 2.0 Indian Revenue Agent Workflow for client: ${account.client_name}...`],
      nodeStates: {
        START: 'running',
        AccountEvaluator: 'pending',
        PipelineAlerter: 'pending',
        FinancialAlerter: 'pending',
        ReportingAgent: 'pending'
      }
    });

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      // 1. START Node
      await sleep(800);
      setExecutionState(prev => ({
        ...prev,
        currentNode: 'AccountEvaluator',
        nodeStates: { ...prev.nodeStates, START: 'completed-clean', AccountEvaluator: 'running' },
        logs: [...prev.logs, `[INFO] Current Graph State: Node='AccountEvaluator'`]
      }));

      // 2. AccountEvaluator Node
      await sleep(1000);
      const isLargeDeal = account.deal_value >= 10000000;
      const pipelineThreshold = isLargeDeal ? 5 : 14;
      const pipelineRisk = account.days_since_last_contact > pipelineThreshold;
      const financialRisk = account.payment_status === 'Overdue';
      
      setExecutionState(prev => ({
        ...prev,
        nodeStates: { ...prev.nodeStates, AccountEvaluator: 'completed-clean' },
        logs: [
          ...prev.logs,
          `[INFO] AccountEvaluator: Analysis complete.`,
          `[INFO] - Portfolio Tier: ${isLargeDeal ? 'HIGH-VALUE (>= ₹1 Cr, Threshold: 5 days)' : 'STANDARD (< ₹1 Cr, Threshold: 14 days)'}`,
          `[INFO] - Days Uncontacted: ${account.days_since_last_contact} days`,
          `[INFO] - Pipeline Risk: ${pipelineRisk ? 'DETECTED' : 'CLEAN'}`,
          `[INFO] - Financial Risk: ${financialRisk ? 'DETECTED' : 'CLEAN'}`
        ]
      }));

      // Decide next node
      let nextNode = pipelineRisk ? 'PipelineAlerter' : (financialRisk ? 'FinancialAlerter' : 'ReportingAgent');
      
      await sleep(800);
      setExecutionState(prev => ({
        ...prev,
        currentNode: nextNode,
        nodeStates: { 
          ...prev.nodeStates, 
          [nextNode]: 'running',
          PipelineAlerter: pipelineRisk ? 'running' : 'skipped',
          FinancialAlerter: !pipelineRisk && financialRisk ? 'running' : prev.nodeStates.FinancialAlerter
        },
        logs: [...prev.logs, `[INFO] Conditional Edge: Navigating to '${nextNode}'`]
      }));

      // 3. Pipeline Alerter
      if (pipelineRisk) {
        await sleep(1200);
        setExecutionState(prev => ({
          ...prev,
          nodeStates: { ...prev.nodeStates, PipelineAlerter: isLargeDeal ? 'completed-critical' : 'completed-alert' },
          logs: [
            ...prev.logs,
            isLargeDeal 
              ? `[CRITICAL RISK] High-Value Pipeline Stalled! Client '${account.client_name}' (Deal: ${formatINR(account.deal_value)}) has not been contacted for {account.days_since_last_contact} days.`
              : `[ALERT] Pipeline Stalled! Client '${account.client_name}' has not been contacted for ${account.days_since_last_contact} days.`,
            `[INFO] Action: Automated follow-up task prioritized on regional executive dashboard.`
          ]
        }));

        nextNode = financialRisk ? 'FinancialAlerter' : 'ReportingAgent';
        await sleep(800);
        setExecutionState(prev => ({
          ...prev,
          currentNode: nextNode,
          nodeStates: { 
            ...prev.nodeStates, 
            [nextNode]: 'running',
            FinancialAlerter: financialRisk ? 'running' : 'skipped'
          },
          logs: [...prev.logs, `[INFO] Routing to next stage: '${nextNode}'`]
        }));
      }

      // 4. Financial Alerter
      if (financialRisk) {
        await sleep(1200);
        
        setExecutionState(prev => ({
          ...prev,
          nodeStates: { ...prev.nodeStates, FinancialAlerter: 'completed-critical' },
          logs: [
            ...prev.logs,
            `[CRITICAL RISK] Payment Overdue! Client '${account.client_name}' has outstanding balance of ${formatINR(account.deal_value)}.`,
            `[SMS DISPATCHED] -> Sent automated payment text link via Twilio API.`,
            `[WHATSAPP DISPATCHED] -> Forwarded transaction reminder via WhatsApp Business API.`,
            `[IVR CALL TRIGGERED] -> Initiated automated outbound reminder voice sequence.`,
            `[SUCCESS] Multi-channel notification pipeline completed successfully.`
          ]
        }));

        // Deduct API Fees from Ledger
        setLedger(prev => [
          { id: Date.now(), date: new Date().toISOString().split('T')[0], description: `Multi-Channel API Delivery Fees (${account.client_name})`, type: "Debited", amount: 450 },
          ...prev
        ]);

        await sleep(800);
        setExecutionState(prev => ({
          ...prev,
          currentNode: 'ReportingAgent',
          nodeStates: { ...prev.nodeStates, ReportingAgent: 'running' },
          logs: [...prev.logs, `[INFO] Routing to next stage: 'ReportingAgent'`]
        }));
      }

      // 5. Reporting Node
      await sleep(1000);
      setExecutionState(prev => ({
        ...prev,
        currentNode: null,
        status: 'completed',
        nodeStates: { ...prev.nodeStates, ReportingAgent: 'completed-clean' },
        logs: [
          ...prev.logs,
          `[SUCCESS] Final Report -> Client: ${account.client_name} | Pipeline: ${pipelineRisk ? 'ALERT' : 'CLEAN'} | Financial: ${financialRisk ? 'CRITICAL' : 'CLEAN'}`,
          `[SUCCESS] Workflow 'RevenueRiskOrchestrator' completed.`
        ]
      }));

      // Log to Audit Trail
      setHistoricalAuditTrail(prev => [
        { 
          date: "Just Now", 
          event: `ADK 2.0 Evaluated ${account.client_name} - Pipeline: ${pipelineRisk ? 'Risk' : 'Clean'}, Financial: ${financialRisk ? 'Risk' : 'Clean'}` 
        },
        ...prev
      ]);
    })();
  };

  // Calculate statistics
  const totalValue = accounts.reduce((acc, curr) => acc + curr.deal_value, 0);
  const totalAtRisk = accounts.reduce((acc, curr) => {
    const isLarge = curr.deal_value >= 10000000;
    const threshold = isLarge ? 5 : 14;
    if (curr.days_since_last_contact > threshold || curr.payment_status === 'Overdue') {
      return acc + curr.deal_value;
    }
    return acc;
  }, 0);
  const activeAlertsCount = alerts.length;
  const averageDays = Math.round(accounts.reduce((acc, curr) => acc + curr.days_since_last_contact, 0) / accounts.length || 0);

  // Calculate Net Recovery Profit (Credited minus Debited)
  const netRecoveryProfit = ledger.reduce((acc, curr) => {
    return curr.type === 'Credited' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <div className="app-container bg-[#0b0f19] text-[#f3f4f6] min-h-screen flex">
      
      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 bg-[#10b981] border border-white/10 text-white px-6 py-4 rounded-lg font-semibold shadow-2xl backdrop-blur-md animate-pulse">
          {toast.message}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="sidebar w-[280px] bg-[#111827] border-r border-white/5 p-8 flex flex-col gap-8 shrink-0">
        <div className="brand flex items-center gap-3">
          <div className="brand-icon w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #ff9933, #ffffff, #128807)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#128807" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="brand-name font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">RevenueAgent IN</span>
        </div>

        <nav>
          <ul className="nav-menu flex flex-col gap-2">
            <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <Icons.Dashboard />
                <span>Dashboard</span>
              </button>
            </li>
            <li className={`nav-item ${activeTab === 'accounts' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('accounts')} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <Icons.Users />
                <span>Accounts Manager</span>
              </button>
            </li>
            <li className={`nav-item ${activeTab === 'graph' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('graph')} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <Icons.Graph />
                <span>ADK Graph Analyzer</span>
              </button>
            </li>
            <li className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('alerts')} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <Icons.Alert />
                <span>Alert Center</span>
                {alerts.length > 0 && (
                  <span className="ml-auto bg-[#ef4444] text-white rounded-full px-2 py-0.5 text-xs font-bold">
                    {alerts.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content flex-grow p-10 overflow-y-auto max-w-[1600px] mx-auto w-full flex flex-col gap-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div className="header-section flex justify-between items-center">
              <div>
                <h1 className="page-title text-3xl font-extrabold tracking-tight">Revenue Risk Dashboard (India)</h1>
                <p className="page-subtitle text-gray-400 text-sm mt-1">Autonomous ADK 2.0 evaluation and financial collections agent</p>
              </div>
              <button className="btn-primary flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-semibold shadow-lg hover:scale-[1.02] transition-all" onClick={() => {
                setActiveTab('graph');
                if (accounts.length > 0) runWorkflow(accounts[0]);
              }}>
                <Icons.Play />
                <span>Run Agent Flow</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 flex flex-col gap-2">
                <div className="stat-header flex justify-between items-center text-gray-400 text-sm">
                  <span>Total Portfolio Value</span>
                  <Icons.Users />
                </div>
                <div className="stat-value text-3xl font-bold">{formatINR(totalValue)}</div>
                <div className="stat-footer text-xs text-gray-500">Across {accounts.length} active clients</div>
              </div>

              <div className="glass-card bg-[#111827]/70 border border-white/5 border-l-4 border-l-[#ef4444] rounded-xl p-6 flex flex-col gap-2">
                <div className="stat-header flex justify-between items-center text-gray-400 text-sm">
                  <span>Revenue At Risk</span>
                  <Icons.Alert />
                </div>
                <div className="stat-value text-3xl font-bold text-[#ef4444]">{formatINR(totalAtRisk)}</div>
                <div className="stat-footer text-xs text-gray-500">Includes Tiered Pipeline Urgency threshold</div>
              </div>

              <div className="glass-card bg-[#111827]/70 border border-white/5 border-l-4 border-l-[#f59e0b] rounded-xl p-6 flex flex-col gap-2">
                <div className="stat-header flex justify-between items-center text-gray-400 text-sm">
                  <span>Active Risk Alerts</span>
                  <Icons.Alert />
                </div>
                <div className="stat-value text-3xl font-bold text-[#f59e0b]">{activeAlertsCount}</div>
                <div className="stat-footer text-xs text-gray-500">Requires immediate attention</div>
              </div>

              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 flex flex-col gap-2">
                <div className="stat-header flex justify-between items-center text-gray-400 text-sm">
                  <span>Avg Days Since Contact</span>
                  <Icons.Dashboard />
                </div>
                <div className="stat-value text-3xl font-bold">{averageDays} Days</div>
                <div className="stat-footer text-xs text-gray-500">Target: Under 14 days (5 days for ₹1 Cr+)</div>
              </div>
            </div>

            {/* Quick Overviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 lg:col-span-2">
                <h3 className="text-lg font-bold mb-4">Critical High-Risk Accounts</h3>
                <div className="table-container overflow-x-auto">
                  <table className="custom-table w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-400 text-sm">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Deal Value</th>
                        <th className="py-3 px-4">Days Uncontacted</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.filter(acc => {
                        const isLarge = acc.deal_value >= 10000000;
                        const threshold = isLarge ? 5 : 14;
                        return acc.days_since_last_contact > threshold || acc.payment_status === 'Overdue';
                      }).map(acc => (
                        <tr key={acc.id} className="border-b border-white/5 hover:bg-white/5 transition-all text-sm">
                          <td className="py-4 px-4 font-semibold">{acc.client_name}</td>
                          <td className="py-4 px-4 font-mono">{formatINR(acc.deal_value)}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${acc.days_since_last_contact > (acc.deal_value >= 10000000 ? 5 : 14) ? 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20'}`}>
                              {acc.days_since_last_contact} days
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${acc.payment_status === 'Overdue' ? 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20' : 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20'}`}>
                              {acc.payment_status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-xs" onClick={() => {
                              setActiveTab('graph');
                              runWorkflow(acc);
                            }}>
                              Analyze
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 font-sans">Recent Alerts</h3>
                <div className="flex flex-col gap-4">
                  {alerts.slice(0, 4).map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg bg-white/5 border-l-4 ${alert.severity === 'danger' ? 'border-l-[#ef4444]' : 'border-l-[#f59e0b]'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">{alert.client_name}</span>
                        <span className="text-gray-500 text-xs">{alert.timestamp}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{alert.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ACCOUNTS MANAGER TAB */}
        {activeTab === 'accounts' && (
          <>
            <div className="header-section flex justify-between items-center">
              <div>
                <h1 className="page-title text-3xl font-extrabold tracking-tight">Accounts Manager</h1>
                <p className="page-subtitle text-gray-400 text-sm mt-1">Add, edit, or remove customer accounts to test the evaluation graph</p>
              </div>
            </div>

            {/* Section 1: Interactive "Add Client" Form */}
            <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <span>➕ Add New Client Account</span>
              </h3>
              <form onSubmit={handleAddClientSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="form-group flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold">Client Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                    value={newClient.client_name} 
                    onChange={(e) => setNewClient({ ...newClient, client_name: e.target.value })}
                    placeholder="e.g. Tata Steel"
                  />
                </div>
                <div className="form-group flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold">Deal Value (₹)</label>
                  <input 
                    type="number" 
                    className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                    value={newClient.deal_value} 
                    onChange={(e) => setNewClient({ ...newClient, deal_value: e.target.value })}
                    placeholder="e.g. 5000000"
                  />
                </div>
                <div className="form-group flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold">Days Uncontacted</label>
                  <input 
                    type="number" 
                    className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                    value={newClient.days_since_last_contact} 
                    onChange={(e) => setNewClient({ ...newClient, days_since_last_contact: e.target.value })}
                    placeholder="e.g. 10"
                  />
                </div>
                <div className="form-group flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold">Payment Status</label>
                  <select 
                    className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                    value={newClient.payment_status} 
                    onChange={(e) => setNewClient({ ...newClient, payment_status: e.target.value })}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded text-sm shadow-md transition-all">
                    Add Account
                  </button>
                </div>
              </form>
            </div>

            <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6">
              <div className="table-container overflow-x-auto">
                <table className="custom-table w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-400 text-sm">
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Deal Value</th>
                      <th className="py-3 px-4">Days Since Last Contact</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map(acc => {
                      const isLarge = acc.deal_value >= 10000000;
                      const threshold = isLarge ? 5 : 14;
                      return (
                        <tr key={acc.id} className="border-b border-white/5 hover:bg-white/5 transition-all text-sm">
                          <td className="py-4 px-4 font-bold">{acc.client_name}</td>
                          <td className="py-4 px-4 font-mono">{formatINR(acc.deal_value)}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${acc.days_since_last_contact > threshold ? 'bg-[#ef4444]/15 text-[#ef4444]' : 'bg-[#f59e0b]/15 text-[#f59e0b]'}`}>
                              {acc.days_since_last_contact} days {isLarge && <span className="text-[10px] opacity-75">(₹1Cr+ Tier)</span>}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${acc.payment_status === 'Overdue' ? 'bg-[#ef4444]/15 text-[#ef4444]' : 'bg-[#10b981]/15 text-[#10b981]'}`}>
                              {acc.payment_status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/5" onClick={() => handleOpenEditModal(acc)} title="Edit Account">
                                <Icons.Edit />
                              </button>
                              <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-[#10b981]" onClick={() => {
                                setActiveTab('graph');
                                runWorkflow(acc);
                              }} title="Run Analyzer">
                                <Icons.Play />
                              </button>
                              <button className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-[#ef4444]" onClick={() => handleDeleteAccount(acc.id, acc.client_name)} title="Delete Account">
                                <Icons.Trash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* GRAPH ANALYZER TAB (Detailed Client Analysis View) */}
        {activeTab === 'graph' && (
          <>
            <div className="header-section flex justify-between items-center">
              <div>
                <h1 className="page-title text-3xl font-extrabold tracking-tight">ADK 2.0 Graph Analyzer</h1>
                <p className="page-subtitle text-gray-400 text-sm mt-1">Select a client and visualize the autonomous agent execution path</p>
              </div>
              <div className="flex gap-4">
                <select 
                  className="form-control bg-[#1f2937] border border-white/5 rounded px-4 py-2.5 text-sm text-white focus:outline-none" 
                  style={{ minWidth: '200px' }}
                  onChange={(e) => {
                    const acc = accounts.find(a => a.id === Number(e.target.value));
                    if (acc) runWorkflow(acc);
                  }}
                  value={selectedAccount?.id || ''}
                >
                  <option value="" disabled>Select an Account...</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.client_name}</option>
                  ))}
                </select>
                {selectedAccount && (
                  <button className="btn-primary flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-semibold shadow-lg hover:scale-[1.02] transition-all" onClick={() => runWorkflow(selectedAccount)}>
                    <Icons.Play />
                    <span>Rerun Agent</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Visual Graph Canvas */}
              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 min-h-[450px] flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-6 left-6 flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500" />
                    <span className="text-gray-400">Executing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500" />
                    <span className="text-gray-400">Clean / Passed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
                    <span className="text-gray-400">Risk Triggered</span>
                  </div>
                </div>

                {selectedAccount ? (
                  <>
                    {/* SVG Connections */}
                    <svg className="graph-svg-overlay absolute inset-0 w-full h-full pointer-events-none z-10">
                      <line 
                        x1="12%" y1="50%" x2="28%" y2="50%" 
                        stroke={executionState.nodeStates.AccountEvaluator !== 'pending' ? '#3b82f6' : '#1f2937'} 
                        strokeWidth="3" 
                        strokeDasharray={executionState.currentNode === 'AccountEvaluator' ? '5,5' : '0'}
                      />
                      <line 
                        x1="38%" y1="50%" x2="52%" y2="30%" 
                        stroke={executionState.nodeStates.PipelineAlerter === 'completed-alert' || executionState.nodeStates.PipelineAlerter === 'completed-critical' || executionState.currentNode === 'PipelineAlerter' ? '#f59e0b' : '#1f2937'} 
                        strokeWidth="3"
                        strokeDasharray={executionState.currentNode === 'PipelineAlerter' ? '5,5' : '0'}
                      />
                      <line 
                        x1="38%" y1="50%" x2="68%" y2="70%" 
                        stroke={executionState.nodeStates.FinancialAlerter === 'completed-critical' || executionState.currentNode === 'FinancialAlerter' ? '#ef4444' : '#1f2937'} 
                        strokeWidth="3"
                        strokeDasharray={executionState.currentNode === 'FinancialAlerter' ? '5,5' : '0'}
                      />
                      <line 
                        x1="60%" y1="30%" x2="68%" y2="70%" 
                        stroke={executionState.nodeStates.FinancialAlerter !== 'pending' ? '#3b82f6' : '#1f2937'} 
                        strokeWidth="3"
                      />
                      <line 
                        x1="60%" y1="30%" x2="85%" y2="50%" 
                        stroke={executionState.nodeStates.ReportingAgent !== 'pending' && selectedAccount.payment_status !== 'Overdue' ? '#10b981' : '#1f2937'} 
                        strokeWidth="3"
                      />
                      <line 
                        x1="76%" y1="70%" x2="85%" y2="50%" 
                        stroke={executionState.nodeStates.ReportingAgent !== 'pending' ? '#10b981' : '#1f2937'} 
                        strokeWidth="3"
                      />
                    </svg>

                    {/* Node Layout */}
                    <div className="graph-nodes-container flex justify-around items-center w-full max-w-[900px] z-20 gap-6">
                      <div className="graph-node-wrapper flex flex-col items-center gap-3">
                        <div className={`graph-node w-28 h-28 rounded-full bg-[#111827] border-2 flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ${executionState.nodeStates.START === 'running' ? 'border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : executionState.nodeStates.START === 'completed-clean' ? 'border-[#10b981] bg-[#10b981]/10' : 'border-white/5'}`}>
                          <div className="text-xs font-bold">START</div>
                          <div className="text-[9px] text-gray-400">Initialize State</div>
                        </div>
                      </div>

                      <div className="graph-node-wrapper flex flex-col items-center gap-3">
                        <div className={`graph-node w-28 h-28 rounded-full bg-[#111827] border-2 flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ${executionState.nodeStates.AccountEvaluator === 'running' ? 'border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : executionState.nodeStates.AccountEvaluator === 'completed-clean' ? 'border-[#10b981] bg-[#10b981]/10' : 'border-white/5'}`}>
                          <div className="text-[11px] font-bold">Evaluator</div>
                          <div className="text-[9px] text-gray-400">Run Risk Criteria</div>
                        </div>
                      </div>

                      <div className="graph-node-wrapper flex flex-col items-center gap-3 -translate-y-12">
                        <div className={`graph-node w-28 h-28 rounded-full bg-[#111827] border-2 flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ${executionState.nodeStates.PipelineAlerter === 'running' ? 'border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : executionState.nodeStates.PipelineAlerter === 'completed-alert' ? 'border-[#f59e0b] bg-[#f59e0b]/10' : executionState.nodeStates.PipelineAlerter === 'completed-critical' ? 'border-[#ef4444] bg-[#ef4444]/10' : executionState.nodeStates.PipelineAlerter === 'skipped' ? 'opacity-30 border-white/5' : 'border-white/5'}`}>
                          <div className="text-[11px] font-bold">PipelineAlerter</div>
                          <div className="text-[9px] text-gray-400">Stalled Contact</div>
                        </div>
                      </div>

                      <div className="graph-node-wrapper flex flex-col items-center gap-3 translate-y-12">
                        <div className={`graph-node w-28 h-28 rounded-full bg-[#111827] border-2 flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ${executionState.nodeStates.FinancialAlerter === 'running' ? 'border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : executionState.nodeStates.FinancialAlerter === 'completed-critical' ? 'border-[#ef4444] bg-[#ef4444]/10' : executionState.nodeStates.FinancialAlerter === 'skipped' ? 'opacity-30 border-white/5' : 'border-white/5'}`}>
                          <div className="text-[11px] font-bold">FinancialAlerter</div>
                          <div className="text-[9px] text-gray-400">Overdue Invoice</div>
                        </div>
                      </div>

                      <div className="graph-node-wrapper flex flex-col items-center gap-3">
                        <div className={`graph-node w-28 h-28 rounded-full bg-[#111827] border-2 flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ${executionState.nodeStates.ReportingAgent === 'running' ? 'border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' : executionState.nodeStates.ReportingAgent === 'completed-clean' ? 'border-[#10b981] bg-[#10b981]/10' : 'border-white/5'}`}>
                          <div className="text-[11px] font-bold">Reporting</div>
                          <div className="text-[9px] text-gray-400">Final Summary</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-center flex flex-col items-center gap-3">
                    <Icons.Graph />
                    <p className="text-sm font-medium">Select a client from the dropdown above to run the ADK 2.0 graph simulation</p>
                  </div>
                )}
              </div>

              {/* Terminal Logs */}
              {selectedAccount && (
                <div className="terminal-card bg-[#050608] border border-white/5 rounded-xl overflow-hidden shadow-lg">
                  <div className="terminal-header bg-[#0e1014] px-5 py-3 border-b border-white/5 flex justify-between items-center text-xs">
                    <div className="terminal-controls flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="terminal-title font-mono text-gray-400">ADK 2.0 Orchestrator Console (IN)</span>
                    <span className="text-gray-500 font-semibold">{selectedAccount.client_name}</span>
                  </div>
                  <div className="terminal-body p-6 font-mono text-sm leading-relaxed max-h-[250px] overflow-y-auto text-[#a9b2c3] flex flex-col gap-2">
                    {executionState.logs.map((log, index) => {
                      let typeClass = "text-blue-400";
                      if (log.startsWith("[ALERT]")) typeClass = "text-yellow-400 font-bold";
                      else if (log.startsWith("[CRITICAL RISK]") || log.startsWith("[SMS DISPATCHED]") || log.startsWith("[WHATSAPP DISPATCHED]") || log.startsWith("[IVR CALL TRIGGERED]")) typeClass = "text-red-400 font-bold";
                      else if (log.startsWith("[SUCCESS]")) typeClass = "text-green-400 font-bold";

                      return (
                        <div className="terminal-line flex gap-2" key={index}>
                          <span className={typeClass}>{log.split(' ')[0]}</span>
                          <span>{log.substring(log.indexOf(' ') + 1)}</span>
                        </div>
                      );
                    })}
                    <div ref={terminalEndRef} />
                  </div>
                </div>
              )}

              {/* BRAND NEW VISUAL SECTIONS (Placed right below main analysis charts) */}
              {selectedAccount && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                  
                  {/* Section 1: Live Correspondence Hub */}
                  <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 flex flex-col gap-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white border-b border-white/5 pb-3">
                      <span>📫 Live Correspondence Hub</span>
                    </h3>
                    <div className="flex flex-col gap-3.5 max-h-[320px] overflow-y-auto pr-2">
                      {(correspondence[selectedAccount.client_name] || []).map((msg) => {
                        const isSent = msg.sender.includes("SENT");
                        return (
                          <div key={msg.id} className={`p-4 rounded-lg flex flex-col gap-2 border border-white/5 ${isSent ? 'bg-[#10b981]/5 border-l-4 border-l-[#10b981]' : 'bg-[#a855f7]/5 border-l-4 border-l-[#a855f7]'}`}>
                            <div className="flex justify-between items-center">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${isSent ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#a855f7]/20 text-[#a855f7]'}`}>
                                {isSent ? "SENT (AI Agent)" : "RECEIVED (Client Reply)"}
                              </span>
                              <span className="text-gray-500 text-xs font-mono">{msg.time}</span>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-300 mb-1">Subject: {msg.subject}</div>
                              <p className="text-xs text-gray-400 leading-relaxed font-sans">{msg.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Visual Transaction Ledger */}
                  <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2 text-white border-b border-white/5 pb-3 mb-4">
                        <span>📊 Account Transaction Ledger</span>
                      </h3>
                      <div className="table-container overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-white/5 text-gray-400 uppercase tracking-wider">
                              <th className="py-2.5 px-3">Date</th>
                              <th className="py-2.5 px-3">Description</th>
                              <th className="py-2.5 px-3">Type</th>
                              <th className="py-2.5 px-3">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ledger.map(item => (
                              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                                <td className="py-3 px-3 text-gray-400 font-mono">{item.date}</td>
                                <td className="py-3 px-3 font-semibold text-gray-300">{item.description}</td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${item.type === 'Credited' ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/20' : 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/20'}`}>
                                    {item.type === 'Credited' ? '+ CREDITED' : '- DEBITED'}
                                  </span>
                                </td>
                                <td className={`py-3 px-3 font-mono font-bold ${item.type === 'Credited' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                                  {item.type === 'Credited' ? '+' : '-'} {formatINR(item.amount)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-center text-sm font-bold bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-300">Net Recovery Profit:</span>
                      <span className={netRecoveryProfit >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                        {formatINR(netRecoveryProfit)}
                      </span>
                    </div>
                  </div>

                </div>
              )}

              {/* Historical Audit Trail */}
              <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Historical Audit Trail (Previous Agent Cycles)</h3>
                <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto">
                  {historicalAuditTrail.map((audit, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-white/5 rounded-lg border-l-4 border-l-purple-500/50 font-mono text-sm text-gray-300">
                      <span className="text-gray-500 font-bold">[{audit.date}]</span>
                      <span>{audit.event}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}

        {/* ALERT CENTER TAB */}
        {activeTab === 'alerts' && (
          <>
            <div className="header-section flex justify-between items-center">
              <div>
                <h1 className="page-title text-3xl font-extrabold tracking-tight">Alert Center</h1>
                <p className="page-subtitle text-gray-400 text-sm mt-1">List of active risks detected by the ADK 2.0 Agent</p>
              </div>
              {alerts.length > 0 && (
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#ef4444]/20 text-[#ef4444] rounded text-sm font-semibold" onClick={() => setAlerts([])}>
                  Clear All Alerts
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <div key={alert.id} className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-6 flex justify-between items-center border-l-4 border-l-[#ef4444]">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-extrabold text-lg">{alert.client_name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${alert.type === 'financial' ? 'bg-[#ef4444]/15 text-[#ef4444]' : 'bg-[#f59e0b]/15 text-[#f59e0b]'}`}>
                          {alert.type === 'financial' ? 'Financial Risk' : 'Pipeline Risk'}
                        </span>
                        <span className="text-gray-500 text-xs">{alert.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{alert.details}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <span className="font-semibold text-gray-400">Next Action:</span>
                        <span>
                          {alert.type === 'financial' 
                            ? 'GST compliance / payment reminder notification dispatched.' 
                            : 'Follow-up task added to regional Account Executive.'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-sm font-semibold text-gray-300 transition-all" onClick={() => handleSendManualReminder(alert.client_name)} title="Force Reminder Notification">
                        <Icons.Mail />
                        <span>Send Manual Notification</span>
                      </button>
                      
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded text-sm font-semibold shadow-md transition-all" onClick={() => {
                        const acc = accounts.find(a => a.client_name === alert.client_name);
                        if (acc) {
                          setActiveTab('graph');
                          runWorkflow(acc);
                        }
                      }}>
                        Re-Evaluate
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card bg-[#111827]/70 border border-white/5 rounded-xl p-12 text-center text-gray-400 flex flex-col items-center gap-3">
                  <Icons.Alert />
                  <p className="text-base font-semibold">All systems clean. No active revenue risks detected!</p>
                </div>
              )}
            </div>
          </>
        )}

      </main>

      {/* CRUD EDIT MODAL */}
      {isEditModalOpen && editingAccount && (
        <div className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="modal-content w-full max-w-md bg-[#111827] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="modal-header p-5 border-b border-white/5 flex justify-between items-center">
              <h3 className="modal-title font-bold text-lg">Edit Client Account</h3>
              <button className="modal-close-btn text-2xl text-gray-400 hover:text-white" onClick={() => setIsEditModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body p-5 flex flex-col gap-4">
              <div className="form-group flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-semibold">Client Name</label>
                <input 
                  type="text" 
                  className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white" 
                  value={editingAccount.client_name} 
                  onChange={(e) => setEditingAccount({ ...editingAccount, client_name: e.target.value })}
                />
              </div>
              <div className="form-group flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-semibold">Deal Value (₹)</label>
                <input 
                  type="number" 
                  className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white" 
                  value={editingAccount.deal_value} 
                  onChange={(e) => setEditingAccount({ ...editingAccount, deal_value: e.target.value })}
                />
              </div>
              <div className="form-group flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-semibold">Days Since Last Contact</label>
                <input 
                  type="number" 
                  className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white" 
                  value={editingAccount.days_since_last_contact} 
                  onChange={(e) => setEditingAccount({ ...editingAccount, days_since_last_contact: e.target.value })}
                />
              </div>
              <div className="form-group flex flex-col gap-2">
                <label className="text-gray-400 text-xs font-semibold">Payment Status</label>
                <select 
                  className="form-control bg-[#1f2937] border border-white/5 rounded p-2.5 text-sm text-white" 
                  value={editingAccount.payment_status} 
                  onChange={(e) => setEditingAccount({ ...editingAccount, payment_status: e.target.value })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="modal-footer p-5 border-t border-white/5 flex justify-end gap-3">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-sm font-semibold" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded text-sm font-semibold shadow-md" onClick={handleSaveEditAccount}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
