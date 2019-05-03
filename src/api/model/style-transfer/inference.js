import * as tf from '@tensorflow/tfjs'

const inference = (MODEL_URL, style, data) => {
	var output = []
	for (var i = 0; i < data.length; i++) {
		let subdata = data[i];
		tf.loadLayersModel(MODEL_URL)
			.then((Model) => {
				const inputData = tf.tensor3d(subdata, [1, 900, 1])
				return Model.predict(inputData)
			})
			.then((outputTensor) => {
				return outputTensor[3].array()
			})
			.then((subOutput) => {
				output = output.concat(subOutput);
				if (output.length === data.length) {
					let jsonData = JSON.stringify({ 'Array': output, 'Original': data, 'Style': style });
					console.log(jsonData);
				}
			})
			.catch(error => {
				console.log(error)
			})
	}
	return output;
}

export default inference;