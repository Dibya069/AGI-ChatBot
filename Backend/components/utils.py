from dataclasses import dataclass
from langgraph.checkpoint.memory import MemorySaver

@dataclass
class StaticData:
    Modle_name = "llama3-8b-8192"
    memory = MemorySaver()