import httpx

from app.config import settings


class VLLMClient:

    async def chat(self, messages):

        payload = {

            "model": settings.MODEL_NAME,

            "messages": messages,

            "temperature": settings.TEMPERATURE,

            "max_tokens": settings.MAX_TOKENS

        }

        async with httpx.AsyncClient(timeout=120) as client:

            response = await client.post(

                settings.VLLM_URL,

                json=payload

            )

            response.raise_for_status()

            return response.json()


vllm_client = VLLMClient()