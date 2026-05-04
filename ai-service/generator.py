import os
import asyncio
import edge_tts
from googletrans import Translator
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from moviepy.editor import AudioFileClip, ColorClip, ImageClip, concatenate_videoclips
from PIL import Image, ImageDraw, ImageFont
import time

class AIContentGenerator:
    def __init__(self, output_dir="ai-service/static/generated", static_dir="ai-service/static"):
        self.output_dir = output_dir
        self.static_dir = static_dir
        os.makedirs(self.output_dir, exist_ok=True)
        self.translator = Translator()
        
        # Font paths (Windows Defaults)
        self.en_font = "C:/Windows/Fonts/arial.ttf"
        self.ta_font = "C:/Windows/Fonts/Nirmala.ttf" # High quality MS Tamil font
        self.teacher_img_path = os.path.join(self.static_dir, "teacher.png")

    async def translate_to_tamil(self, text):
        try:
            result = self.translator.translate(text, dest='ta')
            return result.text
        except Exception as e:
            print(f"Translation error: {e}")
            return text 

    async def generate_audio(self, text, filename, voice="en-US-JennyNeural"):
        filepath = os.path.join(self.output_dir, filename)
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(filepath)
        if not os.path.exists(filepath) or os.path.getsize(filepath) == 0:
            raise Exception(f"Failed to generate audio: {filename}")
        return filepath

    def create_slide(self, title, content, is_tamil=False):
        # Create a 1280x720 canvas
        img = Image.new('RGB', (1280, 720), color=(47, 62, 70))
        draw = ImageDraw.Draw(img)
        
        # Draw Teacher Character if exists
        try:
            if os.path.exists(self.teacher_img_path):
                teacher = Image.open(self.teacher_img_path).convert("RGBA")
                teacher.thumbnail((400, 600))
                # Position on the right
                img.paste(teacher, (850, 120), teacher)
        except Exception as e:
            print(f"Character overlay error: {e}")

        # Choose Font
        font_path = self.ta_font if is_tamil else self.en_font
        try:
            title_font = ImageFont.truetype(font_path, 48)
            content_font = ImageFont.truetype(font_path, 28)
        except:
            title_font = ImageFont.load_default()
            content_font = ImageFont.load_default()

        # Draw Title
        draw.text((72, 80), title, font=title_font, fill=(163, 177, 138))
        
        # Draw Content with Wrap
        margin = 72
        y_offset = 180
        max_width = 750
        
        # Basic word wrap
        words = content.split(' ')
        line = ""
        for word in words:
            test_line = line + word + " "
            # Measure text width
            bbox = draw.textbbox((0, 0), test_line, font=content_font)
            if bbox[2] < max_width:
                line = test_line
            else:
                draw.text((margin, y_offset), line, font=content_font, fill=(244, 247, 245))
                y_offset += 40
                line = word + " "
        draw.text((margin, y_offset), line, font=content_font, fill=(244, 247, 245))

        # Save Temp Slide
        slide_path = os.path.join(self.output_dir, f"temp_slide_{time.time()}.png")
        img.save(slide_path)
        return slide_path

    def generate_pdf(self, title, content, filename):
        filepath = os.path.join(self.output_dir, filename)
        c = canvas.Canvas(filepath, pagesize=letter)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(72, 750, title)
        
        c.setFont("Helvetica", 12)
        text_obj = c.beginText(72, 720)
        lines = content.split('\n')
        for line in lines:
            text_obj.textLine(line)
        c.drawText(text_obj)
        c.showPage()
        c.save()
        return filepath

    def generate_video(self, en_title, ta_title, en_summary, ta_summary, audio_en_path, audio_ta_path, filename):
        filepath = os.path.join(self.output_dir, filename)
        
        # Audio Clips
        audio_en = AudioFileClip(audio_en_path)
        audio_ta = AudioFileClip(audio_ta_path)
        
        # Slide Synthesis (Pillow based)
        slide_en_path = self.create_slide(en_title, en_summary, is_tamil=False)
        slide_ta_path = self.create_slide(ta_title, ta_summary, is_tamil=True)
        
        # Video Clips using ImageSequence (ImageMagick NOT required)
        clip_en = ImageClip(slide_en_path).set_duration(audio_en.duration).set_audio(audio_en)
        clip_ta = ImageClip(slide_ta_path).set_duration(audio_ta.duration).set_audio(audio_ta)
        
        # Assembly
        final_video = concatenate_videoclips([clip_en, clip_ta], method="compose")
        
        # Write File
        # Note: moviepy uses bundled ffmpeg if system one is missing
        final_video.write_videofile(filepath, fps=24, codec="libx264", audio_codec="aac")
        
        # Clean up temp slides
        os.remove(slide_en_path)
        os.remove(slide_ta_path)
        
        return filepath

    async def run_pipeline(self, topic_id, title, summary):
        # 1. Translate
        tamil_title = await self.translate_to_tamil(title)
        tamil_summary = await self.translate_to_tamil(summary)
        
        # 2. Audios (Female Jenny / Pallavi)
        audio_en = await self.generate_audio(summary, f"topic_{topic_id}_en.mp3", "en-US-JennyNeural")
        audio_ta = await self.generate_audio(tamil_summary, f"topic_{topic_id}_ta.mp3", "ta-IN-PallaviNeural")
        
        # 3. PDF
        pdf_path = self.generate_pdf(title, summary, f"topic_{topic_id}.pdf")
        
        # 4. Video (Synthetic Synthesis)
        video_path = self.generate_video(
            title, tamil_title, summary, tamil_summary, 
            audio_en, audio_ta, f"topic_{topic_id}.mp4"
        )
        
        return {
            "videoUrl": f"http://localhost:8000/static/generated/topic_{topic_id}.mp4",
            "audioEnglishUrl": f"http://localhost:8000/static/generated/topic_{topic_id}_en.mp3",
            "audioTamilUrl": f"http://localhost:8000/static/generated/topic_{topic_id}_ta.mp3",
            "pdfUrl": f"http://localhost:8000/static/generated/topic_{topic_id}.pdf",
            "videoScript": summary,
            "audioEnScript": summary,
            "audioTaScript": tamil_summary
        }
