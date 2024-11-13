from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.tools import WikipediaQueryRun
from langgraph.prebuilt import ToolNode

from dotenv import load_dotenv
import os
load_dotenv()

wikipedia_wrapper = WikipediaAPIWrapper(top_k_results = 1, doc_content_chars_max = 300)
wikipedia_tool = WikipediaQueryRun(api_wrapper = wikipedia_wrapper)

tavily_tool = TavilySearchResults(max_results = 5)

class AGI_tools:
    tools = [wikipedia_tool, tavily_tool]
    tool_node = ToolNode(tools=[wikipedia_tool, tavily_tool])