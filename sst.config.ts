/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "my-next-study",
      providers: {
        aws: {
          profile: "default",
          // profile: input?.stage === "staging" ? "staging" : "default",
        },
      },
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb");
  },
});
