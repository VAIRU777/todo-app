from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# フロントと通信できるようにする（CORS対策）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # セキュリティ的には開発用のみ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks", response_model=list[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

# タスク追加
@app.post("/tasks", response_model=schemas.Task)
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(title=task.title)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
