module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@store": "./src/store",
            "@services": "./src/services",
            "@t": "./src/types",
          },
        },
      ],
    ],
  };
};
