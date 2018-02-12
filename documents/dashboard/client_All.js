db.clients.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			    _id: "$industry"
			}
		},

		// Stage 2
		{
			$lookup: // Equality Match
			{
			    from: "client_OB",
			    localField: "_id",
			    foreignField: "_id.industry",
			    as: "client_OB"
			}
			
			// Uncorrelated Subqueries
			// (supported as of MongoDB 3.6)
			// {
			//    from: "<collection to join>",
			//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
			//    pipeline: [ <pipeline to execute on the collection to join> ],
			//    as: "<output array field>"
			// }
		},

		// Stage 3
		{
			$unwind: {
			    path : "$client_OB",
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 4
		{
			$lookup: // Equality Match
			{
			    from: "client_IN",
			    localField: "_id",
			    foreignField: "_id.industry",
			    as: "client_IN"
			}
			
			// Uncorrelated Subqueries
			// (supported as of MongoDB 3.6)
			// {
			//    from: "<collection to join>",
			//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
			//    pipeline: [ <pipeline to execute on the collection to join> ],
			//    as: "<output array field>"
			// }
		},

		// Stage 5
		{
			$unwind: {
			    path : "$client_IN",
			    preserveNullAndEmptyArrays : true // optional
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
