import random
import string

def generate_formatted_password(segment_length=5, num_segments=4):
    # 定義字符池
    characters = string.ascii_letters + string.digits
    segments = [
        ''.join(random.choices(characters, k=segment_length))
        for _ in range(num_segments)
    ]
    formatted_password = '-'.join(segments)
    print("new password: "+ formatted_password)
    return formatted_password
