db.clients.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$project: {
			    "industry": 1,
			    "status1": 1,
			    "status2": 1,
			    "created_at": 1
			}
		},

		// Stage 2
		{
			$addFields: {
			    "value": {$sum: 1},
			    "month": {$month: "$created_at"},
			    "year": {$year: "$created_at"}    
			}
		},

		// Stage 3
		{
			$group: {
			  _id: {
			    industry: "$industry",
			    month: "$month",
			    year: "$year"
			  },
			  value: {$sum: "$value"}
			}
		},

		// Stage 4
		{
			$addFields: {
			    "ob": {
			      $sum: { 
			        $cond: 
			        [
			        		{ $or: 
			        		  [
			        			{"$lt": ["$_id.year", "$_id.year"]},
			        			{ $and: 
			        			  [
			        			  	{"$gte": ["$_id.year", "$_id.year"]},
			        			  	{"$lt": ["$_id.month", "$_id.month"]}
			        			  ]
			        			}
			        		 ] 
			        		}, "$value", 0
			        	]
			      }
				}
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
