# Vue Iris 2 SDK Boilerplate

This is a bare-minimum boilerplate for developing Iris 2 apps using the Alkami SDK with Vue.js. It's been stripped down to the essentials to provide a quick start for SDK developers.

## Using This Boilerplate

Ensure npm and Vue CLI is installed on your system before proceeding.

### Setup

1. Clone the repository and place the app inside a folder named "vue" inside your MVC app's Scripts folder.
2. Run `npm install` from the base folder to install all dependencies
3. Fill in the `fileName` and `areaName` in `vue.config.js`.
4. Add your base64-encoded username and password to the `.npmrc` to authenticate with the Alkami feed.
5. In your MVC app, add script and CSS tags to your `.cshtml` pages, and ensure there's a div with an id of "app". (see MVC .cshtml Sample below)
6. Add exclusions to your project nuspec to not include the vue subfolder. Failing to do this properly can result in your build process hanging as it chokes on the mass of node files (see nuspec file exclusions Sample below)
7. Make sure you've built your MVC app at least once to set up the proper folders in Orb/WebClient before the next step
8. Run `npm run build` in your Vue app's folder to compile and deploy.

### MVC .cshtml Sample

Add the following sections to your MVC `.cshtml` files for JavaScript and CSS:

```cshtml
@section StyleSheetContentPlaceholder{
    @Html.IrisVueLinksSnippet() <!-- Needed for Iris Vue -->
    <link rel="stylesheet" type="text/css" href="~/Areas/ECUDispute/Styles/YourApp.css" /> <!-- Your compiled CSS -->
}

@section JavaScriptIncludeContentPlaceholder{
    <!-- Required scripts for Iris Vue to work -->
    @Html.ScriptWithCacheExpiration("~/lib/vue/vue.runtime.min.js")
    <!-- Optional: Vuex for state management -->
    @Html.ScriptWithCacheExpiration("~/lib/vuex/vuex.min.js")
    <!-- Optional: Vue Router for SPA routing -->
    @Html.ScriptWithCacheExpiration("~/lib/vue-router/vue-router.min.js")
    @Html.IrisVueScriptsSnippet() <!-- Iris Vue -->
    <!-- For loading states in Iris components -->
    @Html.ScriptWithCacheExpiration("~/lib/lottie-web/lottie_light.min.js")
    <!-- Your compiled JavaScript file -->
    @Html.ScriptWithCacheExpiration("~/Areas/ECUDispute/Scripts/YourJs.js")
}
```

### nuspec file exclusions Sample

Add exclusions to the vue subfolder to both the packaging and WebClient scripts folder lines, as below:

```
<file src="**\*.*" target="src" exclude="**\obj\**\*.*;**\.vs\**\*.*;**\bin\**\*.*;**\packages\**\*.*;**\.nuget\**\*.*;**\.git\**\*.*;**\.gitignore;**\node_modules\**\*.*;**\.suo;**\.user;**\Tests\**\*.*;**\Test\**\*.*;**\UnitTest\**\*.*;**\UnitTests\**\*.*;**\tools\**\chocolatey*.ps1;**\web.config;**\Scripts\vue\**\*.*" />

<file src="**\Scripts\" target="content\Areas\App" exclude="**\web.config;**\vue\**\*.*" />
```

If your build process hangs with the vue subfolder present, but works fine when it is removed, then these excludes are your issue. Make sure the folder names here match the actual foldername you have placed your vue app.

Currently, the .nuspec exclusions may not work entirely as intended, resulting in the vue folder being included in the content\Areas\App\Scripts folder of the .nupkg. This can cause issues when submitting the package to Alkami. As a temporary fix:

1. Rename the .nupkg to a .zip file.
2. Open the zip, manually delete the vue folder.
3. Rename the file back to .nupkg.

We are working to resolve this issue. In the meantime, use this workaround to ensure compliance with Alkami's package requirements.

## Setting Up a New Project

To set up a new Vue app with Alkami Iris SDK without using this boilerplate:

1. `vue create new-app` - Choose your preferred presets.
2. Edit `.npmrc` to authorize the Alkami npm feed:

```npmrc
@alkami:registry=https://feeds.alkamitech.com/npm/npm.dev
feeds.alkamitech.com/npm/npm.dev:always-auth=true
//feeds.alkamitech.com/npm/npm.dev:_auth=<Base64 of username:password>
```

Refer to Alkami's [confluence page](https://confluence.alkami.com/sdk/common-support-solutions-216493829.html#CommonSupportSolutions-AddingaccesstoAlkami'sprivateNPMfeed) for more info.

3. Install Alkami Iris SDK:

```sh
npm install @alkami/iris-vue
```

4. Modify `package.json` to move vue, iris-vue, vue-router, vuex libraries to `devDependencies` and configure them as external in `configureWebpack` within `vue.config.js`. This let's Alkami website provide those libraries instead of bundling them in your compiled .js:

```json
"dependencies": {
        "core-js": "^3.8.3"
    },
    "devDependencies": {
        "@alkami/iris-vue": "^1.40.6",
        "@alkami/iris-vue-helper-json": "^0.1.24",
        "@typescript-eslint/eslint-plugin": "^5.4.0",
        "@typescript-eslint/parser": "^5.4.0",
        "@vue/cli-plugin-babel": "~5.0.0",
        "@vue/cli-plugin-eslint": "~5.0.0",
        "@vue/cli-plugin-router": "~5.0.0",
        "@vue/cli-plugin-typescript": "~5.0.0",
        "@vue/cli-service": "~5.0.0",
        "@vue/eslint-config-typescript": "^9.1.0",
        "eslint": "^7.32.0",
        "eslint-config-prettier": "^8.3.0",
        "eslint-plugin-prettier": "^4.0.0",
        "eslint-plugin-vue": "^8.0.3",
        "prettier": "^2.4.1",
        "typescript": "~4.5.5",
        "vue": "^2.7.14",
        "vue-router": "^3.6.2",
        "vue-template-compiler": "^2.6.14"

```

```javascript
// vue.config.js
module.exports = {
  // ... other configurations ...
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      "@alkami/iris-vue": 'globalThis["iris-vue"]',
    },
  },
};
```

5. Build your app with npm run build, then deploy the generated files to your MVC application.

Feel free to copy from vue.config.js to create your own automated file deployments

## Technologies in This Boilerplate

TypeScript
Babel
ESLint
Prettier
Vue Router

Any of these can be removed and everything should work fine, as long as you keep the @alkami npm packages installed.
