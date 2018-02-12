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
			"_id.year": {$gt: 2017}
			}
		},

		// Stage 4
		{
			$group: {
			_id: {
							  industry: "$_id.industry",
							  month: "$_id.month",
							  year: "$_id.year",
							  },
							sum: {$sum: "$value"}
			}
		},

		// Stage 5
		{
			$out: "client_IN"
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
