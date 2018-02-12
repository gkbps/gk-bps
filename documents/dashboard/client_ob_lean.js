db.clients.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			    _id: {
			      industry: "$industry",
				  month: {$month: "$created_at"},
				  year: {$year: "$created_at"},
			    },
			    value: {$sum: 1}
			}
		},

		// Stage 2
		{
			$match: {
			    "_id.year": {$lte: 2017}
			}
		},

		// Stage 3
		{
			$out: "client_OB"
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
