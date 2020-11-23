import cv2
import numpy as np

kernel = np.ones((17, 17), np.uint8)
# src = cv2.imread("text_detection_sample_image.png")
# src = cv2.imread("C:/Users/sam70/PycharmProjects/capstone/text_detection_sample_image.png")

src = cv2.imread("C:/react/tftf/server/image/1.jpg")
grey = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
neg = cv2.bitwise_not(grey)
thresh = cv2.adaptiveThreshold(neg, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 23, -10)
final1 = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

cv2.destroyAllWindows()
contours, hierachy = cv2.findContours(final1, cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)

for contour in contours:
    [x, y, w, h] = cv2.boundingRect(contour)
    if w < 80 or h < 80 or w > 480:
        continue
    if x < 100 or y < 100:
        continue
    # print(x,y)
    cv2.rectangle(src, (x, y), (x + w, y + h), (255, 0, 255), 3)
    print(x,y,w,h)

cv2.imwrite("final.jpg", final1)
cv2.imwrite("result.jpg", src)