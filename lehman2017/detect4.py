import numpy as np
import os
import sys
import tensorflow as tf
import cv2
from websocket import create_connection
import time

sys.path.append("..")

from utils import label_map_util

from utils import visualization_utils as vis_util


detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile('ssd_mobilenet_v1_coco_11_06_2017/frozen_inference_graph.pb', 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')


label_map = label_map_util.load_labelmap(os.path.join('data', 'mscoco_label_map.pbtxt'))
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=90, use_display_name=True)
category_index = label_map_util.create_category_index(categories)



def capture(url):
  cap = cv2.VideoCapture(url)
  frame_n= 0
  # ws = create_connection("ws://148.84.204.98:8080/websocket")
  ws = create_connection("ws://148.84.204.98:8080")
  with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
      while True:
        ret, image_np = cap.read()
        image_np_expanded = np.expand_dims(image_np, axis=0)
        image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
        boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
        scores = detection_graph.get_tensor_by_name('detection_scores:0')
        classes = detection_graph.get_tensor_by_name('detection_classes:0')
        num_detections = detection_graph.get_tensor_by_name('num_detections:0')
        (boxes, scores, classes, num_detections) = sess.run(
            [boxes, scores, classes, num_detections],
            feed_dict={image_tensor: image_np_expanded})
        vis_util.visualize_boxes_and_labels_on_image_array(
            image_np,
            np.squeeze(boxes),
            np.squeeze(classes).astype(np.int32),
            np.squeeze(scores),
            category_index,
            use_normalized_coordinates=True,
            line_thickness=4)

        if float(scores[0,0]) > 0.60 and int(classes[0, 0]) == 3:
            print "Sending car warning..."
            ws.send("WARNING CAR AHEAD!!!")
        if float(scores[0,0]) > 0.60  and int(classes[0,0]) == 16:
            print "Sending bird warning..."
            ws.send("DONT STEP ON THE BIRD!!!")
        if float(scores[0,0]) > 0.60  and int(classes[0,0]) == 44:
            print "Sending bottle warning..."
            ws.send("Its a Bottle!")





        print "--------------------------"
        print 'score',float(scores[0,0])
        print 'class: ',int(classes[0,0])
        print 'box:', boxes[0,0]



        print 'Frame: ',frame_n
        frame_n +=1
        cv2.imshow('A-Eyes', cv2.resize(image_np, (800,700)))
        if cv2.waitKey(25) & 0xFF == ord('q'):
          cv2.destroyAllWindows()
          break
capture(0)
#capture('http://148.84.200.159:6843/videoView')



