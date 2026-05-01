from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()

@router.post("/import/csv")
async def import_csv(file: UploadFile = File(...)):
    return {"status": "received", "filename": file.filename, "message": "CSV batch importer – full implementation in Phase 2"}

@router.post("/import/json")
async def import_json(file: UploadFile = File(...)):
    return {"status": "received", "filename": file.filename, "message": "JSON importer – full implementation in Phase 2"}

    