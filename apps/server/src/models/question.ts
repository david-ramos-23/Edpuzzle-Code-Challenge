import { InferSchemaType, model, Schema } from 'mongoose'

const questionSchema = new Schema(
	{
		text: { type: String, required: true },
	},
	{ timestamps: true }
)

questionSchema.method('toJSON', function () {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

type Question = InferSchemaType<typeof questionSchema>

export default model<Question>('Question', questionSchema)
