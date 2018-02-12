db.clients.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$addFields: {
			    "year": {$year: "$created_at"},
			    "month": {$month: "$created_at"}
			}
		},

		// Stage 2
		{
			$group: {
			    _id: {      
			      industry: "$industry",
			      status1: "$status1",
			      status2: "$status2",
			      month: {
			        $cond: {
			          if: {$gte: ["$year", 2018]},
			          then: {$month: "$created_at"},
			          else: NumberInt(0)
			        }        
			      }      
			    },
			    value: {$sum: NumberInt(1)}
			}
		},

		// Stage 3
		{
			$sort: {
			    "_id.industry": 1,
			    "_id.status1": 1,
			    "_id.status2": 1,    
			    "_id.month": 1
			}
		},

		// Stage 4
		{
			$addFields: {
			    "key": {
			      $concat: [
			          "$_id.industry",    
			          "-",
			          "$_id.status1",
			          "-",
			          "$_id.status2",
			          "-",          
			          {$substr: ["$_id.month", 0, -1]},
			      ]
			    }
			}
		},

		// Stage 5
		{
			$out: "client_DASHBOARD_SERVICE_STATUS"
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
