db.client_DASHBOARD_STATUS_ALL.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
				_id: {
				  status1: "$_id.status1",
				  status2: "$_id.status2"
				},	
				value: {$sum: "$value"}
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
