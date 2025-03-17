# Ollama with Open WebUI and AnythingLLM

This Docker Compose setup runs [Ollama](https://ollama.ai/) with multiple UI options:
- [Open WebUI](https://github.com/open-webui/open-webui) - A user-friendly interface to interact with AI models
- [AnythingLLM](https://github.com/mintplexlabs/anythingllm) - An alternative UI with document processing capabilities

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Sufficient disk space for AI models (models can be several GB each)

### Starting the Services

1. Navigate to this directory:
   ```bash
   cd path/to/ollama
   ```

2. Start the services:
   ```bash
   docker compose up -d
   ```

3. Access the interfaces:
   - Open WebUI: `http://localhost:3000`
   - AnythingLLM: `http://localhost:3001`

### Using Your Own Open WebUI Code Base

To use your own Open WebUI code instead of the pre-built image:

1. Clone the Open WebUI repository or prepare your custom code:
   ```bash
   git clone https://github.com/open-webui/open-webui.git ./path/to/your/open-webui-code
   ```

2. Edit the `docker-compose.yml` file:
   - Comment out the default `open-webui` service section
   - Uncomment the `open-webui-dev` service section
   - Update the `context` path to point to your code directory
   - Make sure the volume paths are correct for your setup

3. Start the services with your custom code:
   ```bash
   docker compose up -d
   ```

4. For development with hot-reloading, you may need to adjust the Dockerfile or volumes based on the Open WebUI development setup.

### Using Your Own AnythingLLM Code Base

To use your own AnythingLLM code instead of the pre-built image:

1. Clone the AnythingLLM repository or prepare your custom code:
   ```bash
   git clone https://github.com/mintplexlabs/anythingllm.git ./path/to/your/anythingllm-code
   ```

2. Edit the `docker-compose.yml` file:
   - Comment out the default `anythingllm` service section
   - Uncomment the `anythingllm-dev` service section
   - Update the `context` path to point to your code directory
   - Make sure the volume paths are correct for your setup

3. Start the services with your custom code:
   ```bash
   docker compose up -d
   ```

4. Development notes:
   - The configuration includes separate volume mounts for frontend and server node_modules
   - The `NODE_ENV=development` environment variable is set for development mode
   - You may need to run build commands inside the container for frontend changes:
     ```bash
     docker exec -it anythingllm-dev bash -c "cd frontend && npm run build"
     ```

### UI Options

#### Open WebUI
- Simple chat interface
- Model management
- Conversation history
- Customizable settings

#### AnythingLLM
- Document processing and RAG capabilities
- Vector database integration (Chroma)
- Multiple workspace support
- Document Q&A

### Pulling Models

Once the services are running, you can pull models through either UI or using the Ollama API:

```bash
# Example: Pull the Llama 2 model
curl http://localhost:11434/api/pull -d '{"name": "llama2"}'
```

### Data Persistence

Data is stored in the following directories:
- `./ollama-data`: Ollama models and configuration
- `./open-webui-data`: Open WebUI data and settings
- `./anythingllm-data`: AnythingLLM storage and vector database

### Stopping the Services

```bash
docker compose down
```

## Configuration

- To enable authentication for Open WebUI, set `WEBUI_AUTH=true` in the docker-compose.yml file.
- AnythingLLM has a first-time setup process when you access the UI.
- Additional configuration options can be found in the documentation for [Ollama](https://github.com/ollama/ollama), [Open WebUI](https://github.com/open-webui/open-webui), and [AnythingLLM](https://github.com/mintplexlabs/anythingllm). 