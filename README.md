# The Bridge - Social Conflict Resolver

## Overview
"The Bridge" is an AI-powered social conflict resolution application. It leverages a Multi-Agent Internal Debate architecture using Gemini 1.5 Flash to help users process interpersonal conflicts constructively.

### Multi-Agent Architecture
1. **Agent 1 (The Empath):** Listens to feelings, validates emotions, and deeply summarizes the context to ensure the user feels completely heard.
2. **Agent 2 (The Mediator):** Analyzes the situation from the "Other POV", identifying stressors or misunderstandings objectively, without blaming the user.
3. **The Internal Debate (Synthesizer):** A hidden deliberation phase where the Empath's validation and the Mediator's perspective are fused to generate a "Bridge Script"—a practical, empathetic, and boundary-respecting message the user can realistically send.

## Setup & Local Execution

1. Build a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/Scripts/activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Export your Gemini API Key:
```bash
set GEMINI_API_KEY="your_api_key_here"  # On Windows Powershell: $env:GEMINI_API_KEY="your_api_key_here"
```

4. Run the application:
```bash
streamlit run app.py
```

## Deployment on Google Cloud Run

To deploy this application to Google Cloud Run, execute the following command (assuming your gcloud CLI is authenticated and configured):

```bash
gcloud run deploy social-bridge \
    --source . \
    --port 8080 \
    --allow-unauthenticated \
    --set-env-vars GEMINI_API_KEY=YOUR_API_KEY_HERE
```
