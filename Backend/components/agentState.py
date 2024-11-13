from langgraph.graph.message import add_messages
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph
from langchain_groq import ChatGroq

import os
from Backend.components.utils import StaticData
from Backend.components.tools import AGI_tools

from dotenv import load_dotenv
load_dotenv()

class State(TypedDict):
    messages: Annotated[list, add_messages]

groq_chat = ChatGroq( 
    model_name = StaticData.Modle_name
)

class Builder_llm:
    graph_builder = StateGraph(State)
    llm_with_tools = groq_chat.bind_tools(AGI_tools.tools)