from fastapi import APIRouter, HTTPException

from app.schemas import ChatRequest

from app.services.vllm_client import vllm_client

router = APIRouter()


@router.post("/api/v1/chat")
async def chat(request: ChatRequest):

    try:

        response = await vllm_client.chat(

            [message.model_dump() for message in request.messages]

        )

        return {

            "response": response["choices"][0]["message"]["content"]

        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )