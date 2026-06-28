"""
================================================================================
REVENUE RISK & FOLLOW-UP AGENT (ADK 2.0 GRAPH ARCHITECTURE - INDIA EDITION)
================================================================================
An autonomous agentic workflow built using a simulated ADK 2.0 Graph 
Architecture to identify, evaluate, and mitigate revenue risks in customer accounts.

This implementation is localized for the Indian market, featuring Indian client 
entities, INR currency formatting (₹), and GST/NEFT-related action reminders.
"""

import time
import sys
from dataclasses import dataclass, field
from typing import List, Dict, Any, Callable, Tuple, Union

# Ensure the terminal output supports UTF-8 (especially for the Rupee symbol on Windows)
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# ==============================================================================
# 0. PREMIUM CONSOLE STYLING (ANSI ESCAPE CODES)
# ==============================================================================
class TermColor:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def log_section(title: str):
    print(f"\n{TermColor.HEADER}{TermColor.BOLD}=== {title} ==={TermColor.ENDC}")

def log_info(msg: str):
    print(f"{TermColor.OKBLUE}[INFO]{TermColor.ENDC} {msg}")

def log_success(msg: str):
    print(f"{TermColor.OKGREEN}[SUCCESS]{TermColor.ENDC} {msg}")

def log_alert(msg: str):
    print(f"{TermColor.WARNING}[ALERT] {msg}{TermColor.ENDC}")

def log_critical(msg: str):
    print(f"{TermColor.FAIL}{TermColor.BOLD}[CRITICAL RISK] {msg}{TermColor.ENDC}")


# ==============================================================================
# 1. MOCK DATASET STRUCTURE & RECORDS
# ==============================================================================
@dataclass
class CustomerAccount:
    client_name: str
    deal_value: int
    days_since_last_contact: int
    payment_status: str  # e.g., "Paid", "Overdue", "Pending"

# Helper for Indian currency formatting
def format_inr(value: int) -> str:
    # Basic Indian numbering system formatting
    s = str(value)
    if len(s) <= 3:
        return "₹" + s
    last_three = s[-3:]
    other_parts = s[:-3]
    formatted = ""
    while len(other_parts) > 0:
        if len(other_parts) > 2:
            formatted = "," + other_parts[-2:] + formatted
            other_parts = other_parts[:-2]
        else:
            formatted = other_parts + formatted
            other_parts = ""
    return "₹" + formatted + "," + last_three

# Seed the dataset with Indian corporate entities
MOCK_ACCOUNTS = [
    CustomerAccount(
        client_name="Tata Motors Ltd", 
        deal_value=7500000, 
        days_since_last_contact=18, 
        payment_status="Paid"
    ),  # Stalled pipeline (> 14 days)
    CustomerAccount(
        client_name="Reliance Retail", 
        deal_value=15000000, 
        days_since_last_contact=5, 
        payment_status="Overdue"
    ),  # Critical overdue invoice
    CustomerAccount(
        client_name="Infosys Technologies", 
        deal_value=9000000, 
        days_since_last_contact=4, 
        payment_status="Paid"
    ),  # Healthy account
    CustomerAccount(
        client_name="Zomato Media", 
        deal_value=4500000, 
        days_since_last_contact=22, 
        payment_status="Overdue"
    )  # Double risk (Stalled & Overdue)
]


# ==============================================================================
# 2. ADK 2.0 GRAPH ENGINE SIMULATION
# ==============================================================================
class AgentNode:
    """
    Represents an autonomous processing node/agent within the ADK 2.0 workflow.
    """
    def __init__(self, name: str, instruction: str, action_fn: Callable[[Dict[str, Any]], Dict[str, Any]]):
        self.name = name
        self.instruction = instruction
        self.action_fn = action_fn

    def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        log_info(f"Executing Agent Node: '{self.name}' ({self.instruction})")
        return self.action_fn(state)


class Workflow:
    """
    Simulates the ADK 2.0 Workflow class, orchestrating execution across a
    Directed Acyclic Graph (DAG) of Agent Nodes and conditional routing.
    """
    def __init__(self, name: str):
        self.name = name
        self.nodes: Dict[str, AgentNode] = {}
        self.edges: List[Tuple[str, str]] = []
        self.conditional_edges: Dict[str, Callable[[Dict[str, Any]], str]] = {}

    def add_node(self, node: AgentNode) -> 'Workflow':
        self.nodes[node.name] = node
        return self

    def add_edge(self, from_node: str, to_node: str) -> 'Workflow':
        self.edges.append((from_node, to_node))
        return self

    def add_conditional_edge(self, from_node: str, routing_fn: Callable[[Dict[str, Any]], str]) -> 'Workflow':
        self.conditional_edges[from_node] = routing_fn
        return self

    def run(self, initial_state: Dict[str, Any]) -> Dict[str, Any]:
        log_section(f"Starting ADK 2.0 Workflow: {self.name}")
        current_node_name = "START"
        state = initial_state.copy()

        while current_node_name != "END":
            log_info(f"Current Graph State: Node='{current_node_name}'")
            
            # If the current node is a registered Agent Node, execute it
            if current_node_name in self.nodes:
                state = self.nodes[current_node_name].execute(state)

            # Determine the next node
            next_node = None
            
            # Check conditional routing first
            if current_node_name in self.conditional_edges:
                next_node = self.conditional_edges[current_node_name](state)
                log_info(f"Conditional Edge triggered: '{current_node_name}' -> '{next_node}'")
            else:
                # Find standard edge
                for from_n, to_n in self.edges:
                    if from_n == current_node_name:
                        next_node = to_n
                        break
            
            if not next_node:
                log_info(f"No outgoing edges from '{current_node_name}'. Ending workflow execution.")
                break
                
            current_node_name = next_node
            time.sleep(0.1)  # Brief sleep to simulate real-time agent thinking/processing

        log_success(f"Workflow '{self.name}' execution completed successfully.")
        return state


# ==============================================================================
# 3. LOCAL SIMULATION TOOLS (MOCK ACTIONS)
# ==============================================================================
def trigger_pipeline_alert_tool(client_name: str, days: int) -> None:
    """
    Simulation Tool: Prints formatted [ALERT] messages to the console for pipeline risks.
    """
    log_alert(f"Pipeline Stalled! Client '{client_name}' has not been contacted for {days} days. (Action: Schedule follow-up meeting via regional team)")


def trigger_collections_alert_tool(client_name: str, deal_value: int) -> None:
    """
    Simulation Tool: Prints formatted [CRITICAL RISK] messages for overdue invoices.
    """
    log_critical(f"Payment Overdue! Client '{client_name}' has an outstanding balance of {format_inr(deal_value)}. (Action: Send formal GST e-Invoice notice & NEFT verification request)")


# ==============================================================================
# 4. AGENT DEFINITIONS & WORKFLOW CONSTITUTION
# ==============================================================================

# Node 1: Account Evaluator Agent
def evaluate_account_logic(state: Dict[str, Any]) -> Dict[str, Any]:
    account: CustomerAccount = state["account"]
    is_large_deal = account.deal_value >= 10000000
    pipeline_threshold = 5 if is_large_deal else 14
    
    state["pipeline_risk"] = account.days_since_last_contact > pipeline_threshold
    state["financial_risk"] = account.payment_status == "Overdue"
    
    log_info(f"Tier: {'High-Value (>= ₹1 Cr, Threshold: 5 days)' if is_large_deal else 'Standard (< ₹1 Cr, Threshold: 14 days)'}")
    log_info(f"Days since last contact: {account.days_since_last_contact} | Threshold: {pipeline_threshold}")
    return state

evaluator_agent = AgentNode(
    name="AccountEvaluator",
    instruction="Evaluate account against risk criteria",
    action_fn=evaluate_account_logic
)

# Node 2: Pipeline Alert Agent
def pipeline_alert_logic(state: Dict[str, Any]) -> Dict[str, Any]:
    account: CustomerAccount = state["account"]
    trigger_pipeline_alert_tool(account.client_name, account.days_since_last_contact)
    state["pipeline_alert_triggered"] = True
    return state

pipeline_agent = AgentNode(
    name="PipelineAlerter",
    instruction="Trigger follow-up alerts for stalled accounts",
    action_fn=pipeline_alert_logic
)

# Node 3: Financial Risk Agent
def financial_alert_logic(state: Dict[str, Any]) -> Dict[str, Any]:
    account: CustomerAccount = state["account"]
    trigger_collections_alert_tool(account.client_name, account.deal_value)
    
    # Section 2: Multi-Channel Dispatch Logging
    print(f"{TermColor.FAIL}[SMS DISPATCHED] -> Sent automated payment text link via Twilio API.{TermColor.ENDC}")
    print(f"{TermColor.FAIL}[WHATSAPP DISPATCHED] -> Forwarded transaction reminder via WhatsApp Business API.{TermColor.ENDC}")
    print(f"{TermColor.FAIL}[IVR CALL TRIGGERED] -> Initiated automated outbound reminder voice sequence.{TermColor.ENDC}")
    
    state["financial_alert_triggered"] = True
    return state

financial_agent = AgentNode(
    name="FinancialAlerter",
    instruction="Trigger collection alerts for overdue accounts",
    action_fn=financial_alert_logic
)

# Node 4: Reporting & Summary Agent
def reporting_logic(state: Dict[str, Any]) -> Dict[str, Any]:
    account: CustomerAccount = state["account"]
    pipeline = "TRIGGERED" if state.get("pipeline_alert_triggered") else "CLEAN"
    financial = "TRIGGERED" if state.get("financial_alert_triggered") else "CLEAN"
    
    status_str = f"Client: {account.client_name} | Pipeline Risk: {pipeline} | Financial Risk: {financial}"
    log_success(f"Final Report -> {status_str}")
    return state

reporting_agent = AgentNode(
    name="ReportingAgent",
    instruction="Aggregate results and generate final report",
    action_fn=reporting_logic
)


# ==============================================================================
# 5. ORCHESTRATE GRAPH EDGES & ROUTING
# ==============================================================================
# Define the routing logic through the DAG
# START -> AccountEvaluator -> CheckPipelineRisk (Conditional)
#   - If pipeline_risk is True -> PipelineAlerter -> CheckFinancialRisk
#   - Else -> CheckFinancialRisk
# CheckFinancialRisk (Conditional)
#   - If financial_risk is True -> FinancialAlerter -> ReportingAgent
#   - Else -> ReportingAgent
# ReportingAgent -> END

def route_after_evaluation(state: Dict[str, Any]) -> str:
    if state.get("pipeline_risk"):
        return "PipelineAlerter"
    return "CheckFinancialRisk"

def route_after_pipeline(state: Dict[str, Any]) -> str:
    return "CheckFinancialRisk"

def route_for_financial_risk(state: Dict[str, Any]) -> str:
    if state.get("financial_risk"):
        return "FinancialAlerter"
    return "ReportingAgent"

def route_after_financial(state: Dict[str, Any]) -> str:
    return "ReportingAgent"


# Construct the ADK 2.0 Workflow Graph
revenue_workflow = Workflow("RevenueRiskOrchestrator")

# Add Nodes
revenue_workflow.add_node(evaluator_agent)
revenue_workflow.add_node(pipeline_agent)
revenue_workflow.add_node(financial_agent)
revenue_workflow.add_node(reporting_agent)

# Setup Edges (including dummy/router nodes to keep routing clean)
revenue_workflow.add_edge("START", "AccountEvaluator")
revenue_workflow.add_conditional_edge("AccountEvaluator", route_after_evaluation)
revenue_workflow.add_conditional_edge("PipelineAlerter", route_after_pipeline)

# We use "CheckFinancialRisk" as a virtual routing node in the graph
revenue_workflow.add_conditional_edge("CheckFinancialRisk", route_for_financial_risk)
revenue_workflow.add_conditional_edge("FinancialAlerter", route_after_financial)
revenue_workflow.add_edge("ReportingAgent", "END")


# ==============================================================================
# 6. MAIN EXECUTION
# ==============================================================================
if __name__ == "__main__":
    log_section("KAGGLE VIBE CODING CAPSTONE: REVENUE RISK AGENT (INDIA)")
    log_info(f"Loaded {len(MOCK_ACCOUNTS)} customer account records.")
    
    # Process each account through the autonomous ADK 2.0 graph workflow
    for i, account in enumerate(MOCK_ACCOUNTS, 1):
        print(f"\n{TermColor.BOLD}--- Processing Account {i}/{len(MOCK_ACCOUNTS)}: {account.client_name} ---{TermColor.ENDC}")
        initial_state = {
            "account": account,
            "pipeline_risk": False,
            "financial_risk": False,
            "pipeline_alert_triggered": False,
            "financial_alert_triggered": False
        }
        
        # Execute the graph
        revenue_workflow.run(initial_state)
        print("-" * 60)
    
    log_section("ALL ACCOUNTS PROCESSED SUCCESSFULLY")
