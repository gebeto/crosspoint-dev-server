import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/api/files",
    response: () => {
      return [];
    },
  },
]);
