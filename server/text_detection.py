import cv2
import numpy as np
import tensorflow as tf
import numpy as np
import pathlib

img_height = 200
img_width = 200

f = open("./dict.txt","r")
syllable_dict = []
while True:
    line = f.readline()
    if not line:
        break
    syllable_dict.append(line[:-1])

new_model = tf.keras.models.load_model('D:/model')

# add = "./image/1.jpg"
# path = pathlib.Path(add)
# image = tf.keras.preprocessing.image.load_img(
#             path, target_size=(img_height, img_width))
# img_array = tf.keras.preprocessing.image.img_to_array(image)
# img_array = tf.expand_dims(img_array, 0)

# predictions = new_model.predict(img_array)
# score = (predictions[0])
# print(syllable_dict[np.argmax(score)], np.max(score)*100)

kernel = np.ones((37, 37), np.uint8)

src = cv2.imread("../image/1.jpg")

cropped_img = src[1330:2338, 756:2268]

grey = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2GRAY)
neg = cv2.bitwise_not(grey)
thresh = cv2.adaptiveThreshold(neg, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 23, -10)
final1 = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

contours, hierachy = cv2.findContours(final1, cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
index = 0

for contour in contours:
    [x, y, w, h] = cv2.boundingRect(contour)
    if w < 80 or h < 80 or w > 580:
        continue
    if x < 100 or y < 100:
        continue
    print()
    print(x + 756, y + 1330, w, h)

    cropped_char = cropped_img[y - 10:y+h + 10, x - 10:x+w + 10]
    dst = cv2.resize(cropped_char, dsize=(170, 170), interpolation=cv2.INTER_AREA)
    dst2 = cv2.copyMakeBorder(dst,15,15,15,15,cv2.BORDER_REPLICATE)
    save_path = "../image/char" + str(index) + ".jpg"
    index+=1
    cv2.imwrite(save_path, dst2)
    
    image = tf.keras.preprocessing.image.load_img(save_path, target_size=(img_height, img_width))
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)
    predictions = new_model.predict(img_array)
    score = (predictions[0])
    print()
    print(np.argmax(score), np.max(score)*100)

    cv2.rectangle(src, (x + 756, y + 1330), (x + 756 + w, y + 1330 + h), (255, 0, 255), 3)

cv2.imwrite("../image/final.jpg", final1)
cv2.imwrite("../image/result.jpg", src)
cv2.imwrite("../image/cropped_img.jpg", cropped_img)
