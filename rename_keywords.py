import os
import json

# 이미지 파일 이름 변경
image_dir = "public/assets/keyword"
for filename in os.listdir(image_dir):
    if filename.endswith(".webp"):
        old_name = os.path.join(image_dir, filename)
        new_name = os.path.join(image_dir, filename.replace(" ", "_"))
        if old_name != new_name:
            os.rename(old_name, new_name)
            print(f"Renamed: {filename} -> {new_name}")

# keyword_names.json 파일 수정
json_file = "src/constants/keyword_names.json"
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# eng_name의 공백을 '_'로 변경
for item in data:
    item['eng_name'] = item['eng_name'].replace(" ", "_")

# 수정된 내용을 파일에 저장
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
print("keyword_names.json updated successfully")
