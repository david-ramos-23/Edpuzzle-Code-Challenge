import { InferSchemaType, model, Schema, Types, PaginateModel } from 'mongoose'
import moongosePaginate from 'mongoose-paginate-v2'

const analyticsSchema = new Schema(
	{
		videoId: {
			type: Types.ObjectId,
			ref: 'Video',
		},
		views: [
			{
				time: { type: Date },
			},
		],
	},
	{
		timestamps: true,
	}
)

analyticsSchema.method('toJSON', function () {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

analyticsSchema.plugin(moongosePaginate)

type Analytics = InferSchemaType<typeof analyticsSchema>

export default model<Analytics, PaginateModel<Analytics>>(
	'Analytics',
	analyticsSchema
)
