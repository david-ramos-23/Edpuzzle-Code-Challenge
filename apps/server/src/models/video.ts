import { InferSchemaType, model, Schema, Types } from 'mongoose'

const videoSchema = new Schema(
	{
		videoId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		questions: [
			{
				time: { type: Number },
				questionId: {
					type: Types.ObjectId,
					ref: 'Question',
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

videoSchema.method('toJSON', function () {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

type Video = InferSchemaType<typeof videoSchema>

export default model<Video>('Video', videoSchema)
