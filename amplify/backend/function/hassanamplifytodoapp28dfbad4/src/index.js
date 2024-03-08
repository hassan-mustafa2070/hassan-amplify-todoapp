/* Amplify Params - DO NOT EDIT
	API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIIDOUTPUT
	API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


//   for (const record of event.Records) {
//     console.log(record.eventID);
//     console.log(record.eventName);
//     console.log("DynamoDB Record: %j", record.dynamodb);
//   }
//   return Promise.resolve("Successfully processed DynamoDB record");
// };
// const axios = require("axios");
// exports.handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);

//   const eventName = event.Records.map((item) => item.eventName);
//   const userID = event.Records.map(
//     (item) => item.dynamodb.NewImage.createdBy.S
//   );
//   const id = event.Records.map((item) => item.dynamodb.Keys.id.S);
//   const url = process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIENDPOINTOUTPUT;

//   const input = {
//     input: {
//       id: id.toLocaleString(),
//       userID: userID,
//       count: 1,
//     },
//   };
//   if (eventName == "INSERT") {
    // try {
    //   const response = await axios.post(
    //     url,
    //     {
    //       query: `
    //       mutation CreateTodoUserCount($input: CreateTodoUserCountInput!) {
    //         createTodoUserCount(input: $input) {
    //           id
    //           userID
    //           count
    //           createdAt
    //           updatedAt
    //           __typename
    //         }
    //       }
    //     `,
    //       variables: input,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key":
    //           process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
    //       },
    //     }
    //   );

    //   console.log("Response:", response.data);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error:", error);
    //   throw error;
    // }

//     try {
//       const response = await axios.post(
//         url,
//         {
//           query: `
//           query ListTodoUserCounts(
//             $filter: ModelTodoUserCountFilterInput
//             $limit: Int
//             $nextToken: String
//           ) {
//             listTodoUserCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
//               items {
//                 id
//                 userID
//                 count
//                 createdAt
//                 updatedAt
//                 __typename
//               }
//               nextToken
//               __typename
//             }
//           }
//         `
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key":
//               process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
//           },
//         }
//       );

//       console.log("Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }



//   } else {
//     console.log("not insert");
//   }
// };

const axios = require("axios")
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);


    const eventName = (event.Records.map((item) => item.eventName)).toString();
    const userID = (event.Records.map(
      (item) => item.dynamodb.NewImage.createdBy.S
    )).toString(); 
    const id = (event.Records.map((item) => item.dynamodb.Keys.id.S)).toString(); 
    const url = process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIENDPOINTOUTPUT;

    // const input = {
    //   input: {
    //     id: id,
    //     userID: userID,
    //     count: 1
    //   }
    // };

    try {
    const response = await axios.post(
      url,
      {
        query: `
  query ListTodoUserCounts(
    $filter: ModelTodoUserCountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoUserCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        count
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT
        }
      }
    );

    // console.log("ResponseLALALAL:", response.data);
    const users = response.data.data.listTodoUserCounts.items;
    const filtered = users.filter(user=>user.userID == userID);
    if(filtered){
      const stringcount = (filtered.map(user=>user.count)).toString();
      const   count = parseInt(stringcount);
      const input = {
      input: {
        id: id,
        userID: userID,
        count: eventName === 'INSERT' ? count + 1 : count - 1
      }
    };
      try {
      const response = await axios.post(
        url,
        {
          query: `
  mutation UpdateTodoUserCount(
    $input: UpdateTodoUserCountInput!
    $condition: ModelTodoUserCountConditionInput
  ) {
    updateTodoUserCount(input: $input, condition: $condition) {
      id
      userID
      count
      createdAt
      updatedAt
      __typename
    }
  }
`,
          variables: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
          },
        }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
    }if(!users){
        const input = {
      input: {
        id: id,
        userID: userID,
        count: 1
      }
    };
      try {
      const response = await axios.post(
        url,
        {
          query: `
          mutation CreateTodoUserCount($input: CreateTodoUserCountInput!) {
            createTodoUserCount(input: $input) {
              id
              userID
              count
              createdAt
              updatedAt
              __typename
            }
          }
        `,
          variables: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
          },
        }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
    }

    return response.data;
    
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

};