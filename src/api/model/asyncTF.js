/**
 * Async TensorFlow.js API
 * @description change TF api into async functions,
 *              used for redux async middlewares
 */
import * as tf from '@tensorflow/tfjs'

/**
 * @description async load model from IndexedDB
 * @param {string} MODEL_URL
 * @returns model
 */
export async function async_loadModelFromStorage(modelPath) {
    return await tf.loadLayersModel('indexeddb://' + modelPath);
}

/**
 * @description async load model from URL and save to IndexedDB
 * @param {*} MODEL_URL
 * @returns
 */
export async function async_loadModelFromUrlAndSave(MODEL_URL, modelPath) {
    let model = await tf.loadLayersModel(MODEL_URL);
    model.save('indexeddb://' + modelPath);
    return model;
}

/**
 * @description async tensor3d function
 * @param {*} subData
 * @param {*} vector
 * @returns
 */
export async function async_tensor3d(subData, vector) {
    return await tf.tensor3d(subData, vector)
}

/**
 * @description async tensor2d function
 * @param {*} subData
 * @param {*} vector
 * @returns
 */
export async function async_tensor2d(subData, vector) {
    return await tf.tensor2d(subData, vector)
}

/**
 * @description async predict from Model
 * @param {*} Model
 * @param {*} inputData
 * @returns
 */
export async function async_predict(Model, inputData) {
    return await Model.predict(inputData)
}
