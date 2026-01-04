const dummyData = {
  "/": [
    {
      name: "book.epub",
      size: 2953653,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "Wallpapers",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "sleep",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "nested-1",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "empty-folder",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "some_test_ebook.epub",
      size: 1658321,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "some_another ebook for test.epub",
      size: 3050316,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "test.bmp",
      size: 3050316,
      isDirectory: false,
      isEpub: false,
    },
  ],
  "/nested-1": [
    {
      name: "nested-2",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
  ],
  "/nested-1/nested-2": [
    {
      name: "nested-3",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
  ],
  "/empty-folder": [],
};

export const routes = [
  {
    url: "/api/status",
    response: () => {
      return [];
    },
  },
  {
    url: "/api/files",
    response: (data) => {
      return dummyData[data.path];
    },
  },
  {
    url: "/api/upload",
    response: () => {
      return "Ok";
    },
  },
  {
    url: "/api/mkdir",
    response: () => {
      return "Ok";
    },
  },
  {
    url: "/api/move",
    response: () => {
      return "Ok";
    },
  },
  {
    url: "/api/delete",
    response: () => {
      return "Ok";
    },
  },
].reduce((acc, route) => {
  return {
    ...acc,
    [route.url]: { response: route.response },
  };
}, {});
