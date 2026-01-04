import path from "path";

export const allFiles = {
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
  "/nested-1/nested-2/nested-3": [],
  "/empty-folder": [],
};

export const routes = [
  {
    url: "/api/status",
    response: () => {
      return {
        version: "0.0.0-dev",
        ip: "0.0.0.0",
        mode: "STA",
        rssi: 99,
        freeHeap: 123456,
        uptime: 10,
      };
    },
  },
  {
    url: "/api/files",
    response: (data) => {
      return allFiles[data.path] ?? [];
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
    response: (data) => {
      const dirPath = path.join(data.path, data.name);
      allFiles[dirPath] = [];
      allFiles[data.path].push({
        name: data.name,
        size: 0,
        isDirectory: true,
        isEpub: false,
      });

      return dirPath;
    },
  },
  {
    url: "/api/move",
    response: (data) => {
      const oldPath = data.path;
      const oldDir = path.dirname(oldPath);
      const fileName = path.basename(oldPath);

      const newPath = data.new_path;
      const newDir = path.dirname(newPath);
      const newFileName = path.basename(newPath);

      const file = allFiles[oldDir].find((f) => f.name === fileName);
      file.name = newFileName;

      if (!allFiles[newDir]) {
        throw new Error("Destination directory does not exist");
      }

      allFiles[oldDir] = allFiles[oldDir].filter((f) => f !== file);
      allFiles[newDir] = [...allFiles[newDir], file];
    },
  },
  {
    url: "/api/delete",
    response: (data) => {
      const deletePath = data.path;
      const dir = path.dirname(deletePath);
      const base = path.basename(deletePath);

      allFiles[dir] = allFiles[dir].filter((f) => f.name !== base);
    },
  },
].reduce((acc, route) => {
  return {
    ...acc,
    [route.url]: { response: route.response },
  };
}, {});
