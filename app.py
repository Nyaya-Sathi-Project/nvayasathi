import streamlit as st
import google.generativeai as genai
import os
import random

# Configure Streamlit page
st.set_page_config(page_title="The Bridge", page_icon="🌉", layout="centered")

# Custom CSS for Dark Purple & Gold Theme
st.markdown("""
<style>
    :root {
        --primary-purple: #2D1B4D;
        --secondary-purple: #4B2E83;
        --gold: #D4AF37;
        --text-light: #F0F0F0;
        --bg-dark: #120A21;
    }
    
    .stApp {
        background-color: var(--bg-dark);
        color: var(--text-light);
    }
    
    /* Headers */
    h1, h2, h3, h4, h5, h6 {
        color: var(--gold) !important;
        font-family: 'Inter', sans-serif;
    }
    
    /* Tabs */
    .stTabs [data-baseweb="tab-list"] {
        gap: 24px;
        background-color: transparent;
    }
    .stTabs [data-baseweb="tab"] {
        color: var(--text-light);
        height: 50px;
        white-space: pre-wrap;
        background-color: var(--primary-purple);
        border-radius: 4px 4px 0 0;
        gap: 1px;
        padding-top: 10px;
        padding-bottom: 10px;
        border: 1px solid var(--secondary-purple);
        border-bottom: none;
    }
    .stTabs [aria-selected="true"] {
        background-color: var(--secondary-purple);
        color: var(--gold) !important;
        border-bottom: 2px solid var(--gold);
    }
    
    /* Buttons */
    .stButton>button {
        background-color: var(--secondary-purple);
        color: var(--gold);
        border: 1px solid var(--gold);
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    .stButton>button:hover {
        background-color: var(--gold);
        color: var(--primary-purple);
        border-color: var(--gold);
    }

    /* Text inputs and areas */
    .stTextInput>div>div>input, .stTextArea>div>div>textarea {
        background-color: var(--primary-purple);
        color: var(--text-light);
        border: 1px solid var(--secondary-purple) !important;
        border-radius: 8px;
    }
    
    .stTextInput>div>div>input:focus, .stTextArea>div>div>textarea:focus {
        border-color: var(--gold) !important;
        box-shadow: 0 0 0 1px var(--gold) !important;
    }
</style>
""", unsafe_allow_html=True)

# Initialize Gemini API
api_key = os.environ.get("GEMINI_API_KEY")

# App Header
st.title("🌉 The Bridge")
st.subheader("A Social Conflict Resolver")

if not api_key:
    st.error("⚠️ GEMINI_API_KEY environment variable not found. Please set it in your terminal to use the app.")
    st.stop()

genai.configure(api_key=api_key)

# The model to use throughout
model = genai.GenerativeModel(model_name='gemini-2.5-flash-lite')

# Session State Initialization
if "vent_text" not in st.session_state:
    st.session_state.vent_text = ""
if "empath_response" not in st.session_state:
    st.session_state.empath_response = ""
if "mediator_response" not in st.session_state:
    st.session_state.mediator_response = ""
if "bridge_script" not in st.session_state:
    st.session_state.bridge_script = ""
if "practice_messages" not in st.session_state:
    st.session_state.practice_messages = []
if "practice_persona" not in st.session_state:
    st.session_state.practice_persona = random.choice(["Defensive", "Angry", "Avoidant"])
if "chat_session" not in st.session_state:
    st.session_state.chat_session = None

tab1, tab2, tab3 = st.tabs(["1. Vent", "2. The Bridge", "3. Practice"])

# --- TAB 1: VENT ---
with tab1:
    st.markdown("### Step 1: Let It Out")
    st.markdown("What happened? How are you feeling? The Empath is here to listen without judgment.")
    user_vent = st.text_area("Your Story:", height=150, placeholder="They never replied to my message and it hurts...")
    
    if st.button("Share with The Empath"):
        if user_vent.strip():
            with st.spinner("The Empath is listening..."):
                # Agent 1 (The Empath)
                empath_prompt = f"""
                You are 'The Empath', a hyper-validating and highly emotionally intelligent AI.
                Your user is upset about a social interaction. 
                Your goal: "Mirror" the user's feelings so they feel 100% heard. Validate them deeply.
                Do not give advice. Do not tell them what to do. Just assure them their feelings are valid, summarize the hurt and context carefully.
                User's story: {user_vent}
                """
                response = model.generate_content(empath_prompt)
                st.session_state.empath_response = response.text
                st.session_state.vent_text = user_vent
        else:
            st.warning("Please share your story first.")

    if st.session_state.empath_response:
        st.markdown("#### The Empath Says:")
        st.info(st.session_state.empath_response)

# --- TAB 2: THE BRIDGE ---
with tab2:
    st.markdown("### Step 2: Finding Middle Ground")
    st.markdown("The Empath and The Mediator will debate internally to build a 'Bridge Script'—a practical text message you can send.")
    
    if st.session_state.empath_response:
        if st.button("Build The Bridge"):
            with st.spinner("Internal Debate in Progress... The Mediator is analyzing..."):
                # Agent 2 (The Mediator)
                mediator_prompt = f"""
                You are 'The Mediator', an objective and empathetic advisor.
                A user is upset about this situation: {st.session_state.vent_text}
                The 'Empath' has validated them like this: {st.session_state.empath_response}
                
                Your job is to represent the "Other POV". Identify 2-3 potential stress factors or innocent misunderstandings 
                that might have caused the other person's behavior. Do not blame the user, but provide alternative perspectives.
                """
                mediator_res = model.generate_content(mediator_prompt)
                st.session_state.mediator_response = mediator_res.text
                
                # The Internal Debate / Synthesizer
                debate_prompt = f"""
                You are the final synthesizer of an internal debate between 'The Empath' and 'The Mediator'.
                
                User's original issue: {st.session_state.vent_text}
                The Empath's validation: {st.session_state.empath_response}
                The Mediator's alternative perspective: {st.session_state.mediator_response}
                
                Based on this debate, write a "Bridge Script"—a single, easily sendable text message that the user can use to reach out and resolve the conflict. 
                The script must be:
                - Non-accusatory (use "I" statements)
                - Concise and natural (like a real text message, not completely robotic or overly long)
                - Empathetic but clear about boundaries or feelings.
                
                Just output the exact text message proposed. No extra commentary.
                """
                bridge_res = model.generate_content(debate_prompt)
                st.session_state.bridge_script = bridge_res.text
            
            st.markdown("#### The Internal Debate Results")
            with st.expander("Show The Mediator's Perspective on the Other Person"):
                st.write(st.session_state.mediator_response)
                
            st.markdown("#### Your 'Bridge Script'")
            st.success(st.session_state.bridge_script)
            
    else:
        st.info("Please share your story in the 'Vent' tab first so we have context to build the bridge.")

# --- TAB 3: PRACTICE ---
with tab3:
    st.markdown("### Step 3: Practice Run")
    st.markdown(f"Practice sending your message. Agent 2 is playing the role of the other person and is currently adopting a **{st.session_state.practice_persona}** persona.")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        if st.button("Start New Practice Session"):
            # Randomize the persona for a new experience
            st.session_state.practice_persona = random.choice(["Defensive", "Angry", "Avoidant"])
            st.session_state.practice_messages = []
            st.session_state.chat_session = model.start_chat()
            
            system_instruction = f"""
            You are roleplaying as the other person in a conflict.
            Persona: {st.session_state.practice_persona}.
            Keep your responses concise, like text messages.
            Conflict Context: {st.session_state.vent_text if st.session_state.vent_text else 'A recent disagreement between you two.'}
            You MUST actively act '{st.session_state.practice_persona}'.
            """
            st.session_state.practice_messages.append({"role": "system", "content": system_instruction})
            st.rerun()

    # Display chat history (skipping the underlying system instruction)
    for msg in st.session_state.practice_messages:
        if msg["role"] != "system":
            with st.chat_message(msg["role"]):
                st.markdown(msg["content"])
                
    # Chat input
    if user_input := st.chat_input("Type your message to practice..."):
        # Ensure there is a session running
        if st.session_state.chat_session is None:
            st.session_state.chat_session = model.start_chat()
            system_instruction = f"Roleplay the other person in a conflict. Persona: {st.session_state.practice_persona}. Keep it short."
            st.session_state.practice_messages.append({"role": "system", "content": system_instruction})

        st.session_state.practice_messages.append({"role": "user", "content": user_input})
        with st.chat_message("user"):
            st.markdown(user_input)
            
        with st.chat_message("assistant"):
            with st.spinner("Typing..."):
                full_history = "\n".join([f"{m['role']}: {m['content']}" for m in st.session_state.practice_messages])
                prompt = f"Given the ongoing conversation history:\n{full_history}\n\nRespond to the user as the {st.session_state.practice_persona} persona. Return just the text response. Make it realistic to text messaging."
                
                resp = st.session_state.chat_session.send_message(prompt)
                st.markdown(resp.text)
                st.session_state.practice_messages.append({"role": "assistant", "content": resp.text})
