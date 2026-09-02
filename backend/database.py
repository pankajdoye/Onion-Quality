import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = "sqlite:///./oniongrade.db"
engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class SampleRecord(Base):
    __tablename__ = "analysis_results"

    id = Column(String, primary_key=True, index=True)
    farmer_id = Column(String, default="FARMER-DEFAULT")
    image_url = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    quality_score = Column(Integer)
    grade_a_percentage = Column(Float)
    grade_b_percentage = Column(Float)
    urs_percentage = Column(Float)
    damaged_percentage = Column(Float)
    rotten_percentage = Column(Float)
    sprouted_percentage = Column(Float)
    undersized_percentage = Column(Float)
    average_diameter = Column(Float, default=68.0)
    average_weight = Column(Float, default=82.0)
    estimated_price = Column(Float)
    market = Column(String, default="Lasalgaon APMC")
    confidence = Column(Float, default=94.0)
    model_version = Column(String, default="OnionGrade-v1.1")
    recommendation = Column(String, default="Sample meets recommended Grade A threshold.")

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
