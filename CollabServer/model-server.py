!pip install diffusers transformers accelerate
!pip install flask_cors
!pip install gtts
# !apt-get install imagemagick
!pip install flask[async]
!pip install pyngrok
# !pip install torch --upgrade

import torch
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.utils import export_to_video

from flask import Flask, request
from flask_cors import CORS
from pyngrok import ngrok
from gtts import gTTS
from moviepy.editor import *
from base64 import b64encode
import os


# Set up Diffusion Pipeline
pipe = DiffusionPipeline.from_pretrained("damo-vilab/text-to-video-ms-1.7b", torch_dtype=torch.float16, variant="fp16")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_model_cpu_offload()

# Create API app
app = Flask(_name_)
CORS(app)

@app.route("/api/generate-video/", methods=["POST"])
def generate_video():
    existing_file_path_audio = "/content/output.mp3"
    if os.path.exists(existing_file_path_audio):
        os.remove(existing_file_path_audio)

    existing_file_path = "/content/result_compressed.mp4"
    if os.path.exists(existing_file_path):
        os.remove(existing_file_path)

    req_data = request.get_json()
    prompt = req_data.get("prompt", '')
    length = req_data.get("length", '')
    audio = req_data.get("audio", '')
    print("Prompt =", prompt)
    print("Length =", length)
    print("Audio =", audio)
    print(type(audio))
    if(audio == True):
        tts = gTTS(prompt)
        tts.save(existing_file_path_audio)
        newly_existing_file_path_audio = "/content/output.mp3"
        if not os.path.exists(newly_existing_file_path_audio):
            os.rename(existing_file_path_audio, newly_existing_file_path_audio)
        audio_clip = AudioFileClip(newly_existing_file_path_audio)
        audio_duration = audio_clip.duration
        video_frames = pipe(prompt, num_inference_steps=60, num_frames=8 * int(length)).frames
        video_path = export_to_video(video_frames)
        video_for_duration = VideoFileClip(video_path)
        video_duration = video_for_duration.duration
        video_with_audio = video_for_duration.set_audio(audio_clip)
        finalvideoname = "/content/finalvideo.mp4"
        video_with_audio.write_videofile(finalvideoname, codec="libx264", fps=24)
    else:
        video_frames = pipe(prompt, num_inference_steps=60, num_frames=8 * int(length)).frames
        video_path = export_to_video(video_frames)
        finalvideoname = "/content/finalvideo.mp4"
        video_for_duration = VideoFileClip(video_path)
        video_duration = video_for_duration.duration
        video_for_duration.write_videofile(finalvideoname, codec="libx264", fps=24)

    print('name:', finalvideoname)
    torch.cuda.empty_cache()

    with open(finalvideoname, 'rb') as f:
        video_data = f.read()

    save_path = finalvideoname
    compressed_path = "/content/result_compressed.mp4"
    os.system(f"ffmpeg -i {save_path} -vcodec libx264 {compressed_path}")

    mp4 = open(compressed_path, 'rb').read()
    data_url = "data:video/mp4;base64," + b64encode(mp4).decode()
    print(video_data)   
    return data_url

if _name_ == "_main_":
    os.environ["NGROK_AUTHTOKEN"] = "2aWkdlHkTFqUzBwetuR2ailmeGC_8mKWHEXH3tU7aB7EqN4A"
    public_url = ngrok.connect(5000)
    print(' * ngrok tunnel "{}" -> "http://127.0.0.1:{}/"'.format(public_url, 5000))
    app.run(host="0.0.0.0", port=5000)