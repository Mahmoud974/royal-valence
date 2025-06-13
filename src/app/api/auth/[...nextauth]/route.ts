import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const cognito = new AWS.CognitoIdentityServiceProvider();

        if (!credentials) return null;

        const params = {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
          AuthParameters: {
            USERNAME: credentials.username,
            PASSWORD: credentials.password,
          },
        };

        try {
          await cognito.initiateAuth(params).promise();
          return { id: credentials.username, name: credentials.username };
        } catch (error) {
          console.error("Erreur Cognito:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
