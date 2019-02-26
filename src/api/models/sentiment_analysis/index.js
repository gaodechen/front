import * as tf from '@tensorflow/tfjs';

export default async () => {
  const model = tf.loadModel('./model.json');
  // model.predict("asdf").print();

  const saveResults = await model.save('indexeddb://sentiment_analysis');
  const loadedModel = await tf.loadModel('indexeddb://sentiment_analysis');

  return loadedModel;
}
