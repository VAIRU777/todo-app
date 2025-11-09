from pydantic import BaseModel
from fatetime import date

class TaskBase(BaseModel):
    title: str
    date: date | None = None
class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    done: bool

    class Config:
        orm_mode = True

