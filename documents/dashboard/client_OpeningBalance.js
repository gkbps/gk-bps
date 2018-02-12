db.clients.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$addFields: {
			    "month": {$month: "$created_at"},
			    "year": {$year: "$created_at"},
			}
		},

		// Stage 2
		{
			$group: {
				_id: {
				  industry: "$industry",
				  month: "$month",
				  year: "$year",
				},
				value: {$sum: 1}
			}
		},

		// Stage 3
		{
			$match: {
				"_id.year": {$lte: 2017}
			}
		},

		// Stage 4
		{
			$group: {
				_id: {
				  industry: "$_id.industry",
				  },
				sum: {$sum: "$value"}
			}
		},

		// Stage 5
		{
			$addFields: {
			    "_id.month": 0,
			    "_id.year": 2018
			}
		},

		// Stage 6
		{
			$out: "client_OB"
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
