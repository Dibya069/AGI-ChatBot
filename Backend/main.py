from Backend.components.graphBuild import graph_memory

config = {"configurable": {"thread_id": "1"}}

while 1:
    user_input = input("User : ")
    if user_input.lower() in ["quit", "q"]:
        print("Good Bye")
        break

    events = graph_memory.stream(
        {"messages": [("user", user_input)]}, config, stream_mode="values"
    )
    
    for event in events:
        print(event["messages"][-1].pretty_print())