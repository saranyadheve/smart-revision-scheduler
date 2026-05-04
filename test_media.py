import asyncio
import os
from generator import AIContentGenerator

async def test():
    print("🚀 Starting AI Content Engine Test...")
    gen = AIContentGenerator(output_dir="ai-service/static/generated", static_dir="ai-service/static")
    
    topic_id = 999
    title = "Quantum Mechanics"
    summary = "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles."
    
    try:
        print("🟡 Generating Content (Video + Audio + PDF)...")
        result = await gen.run_pipeline(topic_id, title, summary)
        
        print(f"✅ Success! Generated Files:")
        print(f"   Video: {result['videoUrl']}")
        print(f"   Audio (EN): {result['audioEnglishUrl']}")
        print(f"   Audio (TA): {result['audioTamilUrl']}")
        print(f"   PDF: {result['pdfUrl']}")
        
        # Verify physical files
        files = {
            "MP4": f"ai-service/static/generated/topic_{topic_id}.mp4",
            "MP3 EN": f"ai-service/static/generated/topic_{topic_id}_en.mp3",
            "MP3 TA": f"ai-service/static/generated/topic_{topic_id}_ta.mp3",
            "PDF": f"ai-service/static/generated/topic_{topic_id}.pdf"
        }
        
        for name, path in files.items():
            if os.path.exists(path) and os.path.getsize(path) > 0:
                print(f"   [OK] {name} exists ({os.path.getsize(path)} bytes)")
            else:
                print(f"   [FAIL] {name} missing or empty!")
                
    except Exception as e:
        print(f"❌ Test Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test())
