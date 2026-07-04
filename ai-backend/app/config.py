class Settings:

    # vLLM Container URL
    VLLM_URL = "http://qwen-vllm:8000/v1/chat/completions"

    # Model Name
    MODEL_NAME = "Qwen/Qwen2.5-3B-Instruct"

    # Generation Parameters
    TEMPERATURE = 0.7

    MAX_TOKENS = 512

settings = Settings()