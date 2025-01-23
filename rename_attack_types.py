import os

# attackType 이미지 파일 이름을 소문자로 변경
image_dir = "public/assets/attackType"
for filename in os.listdir(image_dir):
    if filename.endswith(".webp"):
        old_name = os.path.join(image_dir, filename)
        new_name = os.path.join(image_dir, filename.lower())
        if old_name != new_name:
            os.rename(old_name, new_name)
            print(f"Renamed: {filename} -> {new_name}")
