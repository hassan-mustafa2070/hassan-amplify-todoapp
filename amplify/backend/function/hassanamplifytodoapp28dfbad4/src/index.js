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

const axios = require("axios");
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const REMOVE = "REMOVE";
  const INSERT = "INSERT";

  const eventName = event.Records[0].eventName;
  const userId =
    eventName === REMOVE
      ? event.Records[0].dynamodb.OldImage.createdBy.S
      : eventName === INSERT
      ? event.Records[0].dynamodb.NewImage.createdBy.S
      : "";
  const id = event.Records[0].dynamodb.Keys.id.S;
  const url = process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIENDPOINTOUTPUT;

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
`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
        },
      }
    );

    const users = response.data.data.listTodoUserCounts.items;
    const filtered = users.filter((user) => user.userID == userId);
    console.log("filteredusersss", filtered);
    if (!filtered?.length) {
      const input = {
        input: {
          id: id,
          userID: userId,
          count: 1,
        },
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

        console.log("CreatedResponse:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    } else {
      const count = parseInt(filtered[0].count);

      console.log("Count", count);
      const countObjid = filtered[0].id;
      const createinput = {
        input: {
          id: countObjid,
          userID: userId,
          count: eventName === INSERT ? count + 1 : count - 1,
        },
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
            variables: createinput,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                process.env.API_HASSANAMPLIFYTODOAPP_GRAPHQLAPIKEYOUTPUT,
            },
          }
        );

        console.log("UpdatedResponse:", response.data);
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
