const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "ap-south-1_TeUUz43A6",
      userPoolClientId: "6qu8pse3k8rukad67mh8ilu9uk",
      loginWith: {
        email: true,
      },
    },
  },
};

export default awsConfig;