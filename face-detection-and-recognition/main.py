import cv2
from simple_facerec import SimpleFacerec

# Encode faces from a folder
sfr = SimpleFacerec()
sfr.load_encoding_images("images/")

# Load Camera
cam = cv2.VideoCapture(0)

try:
    while True:
        ret, frame = cam.read()

        # Detection of Faces
        face_locations, face_names = sfr.detect_known_faces(frame)
        for face_loc, names in zip(face_locations, face_names):
            y1, x1, y2, x2 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

            cv2.putText(frame,names,(x1, y1 - 10), cv2.FONT_HERSHEY_COMPLEX, 1, (0,0,200),2)
            cv2.rectangle(frame, (x1,y1), (x2,y2), (0,0,200), 2)

        cv2.imshow("Frame", frame)

        key = cv2.waitKey(1)
        if key == 27:
            break

except KeyboardInterrupt:
    print("Interrupted by user. Cleaning up...")

finally:
    cam.release()
    cam.destroyAllWindows()


