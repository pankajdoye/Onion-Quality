import datetime
import sqlite3
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
    overall_quality = Column(String, default="GOOD")
    quality_score = Column(Integer)
    grade_a_percentage = Column(Float)
    grade_b_percentage = Column(Float, default=0.0)
    urs_percentage = Column(Float)
    total_onions = Column(Integer, default=1)
    individual_onions_json = Column(Text, nullable=True)
    damaged_percentage = Column(Float)
    rotten_percentage = Column(Float)
    sprouted_percentage = Column(Float)
    undersized_percentage = Column(Float)
    average_diameter = Column(Float, default=68.0)
    average_weight = Column(Float, default=82.0)
    estimated_price = Column(Float)
    market = Column(String, default="Lasalgaon APMC")
    confidence = Column(Float, default=94.0)
    model_version = Column(String, default="OnionGrade-v2.0-PyTorch")
    recommendation = Column(String, default="Sample meets recommended Grade A threshold.")

def init_db():
    Base.metadata.create_all(bind=engine)
    try:
        with sqlite3.connect("./oniongrade.db") as conn:
            cursor = conn.cursor()
            cursor.execute("PRAGMA table_info(analysis_results);")
            columns = [col[1] for col in cursor.fetchall()]
            if "overall_quality" not in columns:
                cursor.execute("ALTER TABLE analysis_results ADD COLUMN overall_quality TEXT DEFAULT 'GOOD';")
            if "total_onions" not in columns:
                cursor.execute("ALTER TABLE analysis_results ADD COLUMN total_onions INTEGER DEFAULT 1;")
            if "individual_onions_json" not in columns:
                cursor.execute("ALTER TABLE analysis_results ADD COLUMN individual_onions_json TEXT;")
            conn.commit()
    except Exception as e:
        print(f"Database column verification note: {e}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
