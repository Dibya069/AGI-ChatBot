from Backend.components.utils import StaticData
from Backend.components.agentState import Builder_llm as BL
from Backend.components.agentState import State
from Backend.components.tools import AGI_tools

from langgraph.graph import START
from langgraph.prebuilt import tools_condition


def chatbot(state: State):
    return {"messages": [BL.llm_with_tools.invoke(state["messages"])]}


BL.graph_builder.add_node("chatbot", chatbot)
BL.graph_builder.add_node("tools", AGI_tools.tool_node)

BL.graph_builder.add_conditional_edges("chatbot", tools_condition)

BL.graph_builder.add_edge("tools", "chatbot")
BL.graph_builder.add_edge(START,"chatbot")

graph_memory = BL.graph_builder.compile(checkpointer=StaticData.memory)