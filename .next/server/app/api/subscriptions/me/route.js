"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/subscriptions/me/route";
exports.ids = ["app/api/subscriptions/me/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsubscriptions%2Fme%2Froute&page=%2Fapi%2Fsubscriptions%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscriptions%2Fme%2Froute.ts&appDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsubscriptions%2Fme%2Froute&page=%2Fapi%2Fsubscriptions%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscriptions%2Fme%2Froute.ts&appDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_anupmishra_Downloads_golf_charity_platform_app_api_subscriptions_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/subscriptions/me/route.ts */ \"(rsc)/./app/api/subscriptions/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/subscriptions/me/route\",\n        pathname: \"/api/subscriptions/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/subscriptions/me/route\"\n    },\n    resolvedPagePath: \"/Users/anupmishra/Downloads/golf-charity-platform/app/api/subscriptions/me/route.ts\",\n    nextConfigOutput,\n    userland: _Users_anupmishra_Downloads_golf_charity_platform_app_api_subscriptions_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/subscriptions/me/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzdWJzY3JpcHRpb25zJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN1YnNjcmlwdGlvbnMlMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN1YnNjcmlwdGlvbnMlMkZtZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFudXBtaXNocmElMkZEb3dubG9hZHMlMkZnb2xmLWNoYXJpdHktcGxhdGZvcm0lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYW51cG1pc2hyYSUyRkRvd25sb2FkcyUyRmdvbGYtY2hhcml0eS1wbGF0Zm9ybSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nb2xmLWNoYXJpdHktcGxhdGZvcm0vP2UzNmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FudXBtaXNocmEvRG93bmxvYWRzL2dvbGYtY2hhcml0eS1wbGF0Zm9ybS9hcHAvYXBpL3N1YnNjcmlwdGlvbnMvbWUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3N1YnNjcmlwdGlvbnMvbWUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdWJzY3JpcHRpb25zL21lXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zdWJzY3JpcHRpb25zL21lL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2FudXBtaXNocmEvRG93bmxvYWRzL2dvbGYtY2hhcml0eS1wbGF0Zm9ybS9hcHAvYXBpL3N1YnNjcmlwdGlvbnMvbWUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3N1YnNjcmlwdGlvbnMvbWUvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsubscriptions%2Fme%2Froute&page=%2Fapi%2Fsubscriptions%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscriptions%2Fme%2Froute.ts&appDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/subscriptions/me/route.ts":
/*!*******************************************!*\
  !*** ./app/api/subscriptions/me/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\nasync function GET(req) {\n    try {\n        const token = req.cookies.get(\"token\")?.value;\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const session = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(token);\n        const { data: subscription } = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.from(\"subscriptions\").select(\"id, status, renewal_date, cancelled_at\").eq(\"user_id\", session.userId).order(\"created_at\", {\n            ascending: false\n        }).limit(1).maybeSingle();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            subscription: subscription || null\n        });\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N1YnNjcmlwdGlvbnMvbWUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUMxQjtBQUNXO0FBRWxDLGVBQWVHLElBQUlDLEdBQWdCO0lBQ3hDLElBQUk7UUFDRixNQUFNQyxRQUFRRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVQztRQUV4QyxJQUFJLENBQUNILE9BQU87WUFDVixPQUFPTCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsTUFBTUMsVUFBVSxNQUFNVixzREFBV0EsQ0FBQ0c7UUFFbEMsTUFBTSxFQUFFUSxNQUFNQyxZQUFZLEVBQUUsR0FBRyxNQUFNYix1Q0FBRUEsQ0FDcENjLElBQUksQ0FBQyxpQkFDTEMsTUFBTSxDQUFDLDBDQUNQQyxFQUFFLENBQUMsV0FBV0wsUUFBUU0sTUFBTSxFQUM1QkMsS0FBSyxDQUFDLGNBQWM7WUFBRUMsV0FBVztRQUFNLEdBQ3ZDQyxLQUFLLENBQUMsR0FDTkMsV0FBVztRQUVkLE9BQU90QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCSyxjQUFjQSxnQkFBZ0I7UUFDaEM7SUFDRixFQUFFLE9BQU07UUFDTixPQUFPZCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXdCLEdBQ2pDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ29sZi1jaGFyaXR5LXBsYXRmb3JtLy4vYXBwL2FwaS9zdWJzY3JpcHRpb25zL21lL3JvdXRlLnRzPzhiNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9saWIvZGJcIjtcbmltcG9ydCB7IHZlcmlmeVRva2VuIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW4gPSByZXEuY29va2llcy5nZXQoXCJ0b2tlblwiKT8udmFsdWU7XG5cbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB2ZXJpZnlUb2tlbih0b2tlbik7XG5cbiAgICBjb25zdCB7IGRhdGE6IHN1YnNjcmlwdGlvbiB9ID0gYXdhaXQgZGJcbiAgICAgIC5mcm9tKFwic3Vic2NyaXB0aW9uc1wiKVxuICAgICAgLnNlbGVjdChcImlkLCBzdGF0dXMsIHJlbmV3YWxfZGF0ZSwgY2FuY2VsbGVkX2F0XCIpXG4gICAgICAuZXEoXCJ1c2VyX2lkXCIsIHNlc3Npb24udXNlcklkKVxuICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAgIC5saW1pdCgxKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3Vic2NyaXB0aW9uOiBzdWJzY3JpcHRpb24gfHwgbnVsbCxcbiAgICB9KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsInZlcmlmeVRva2VuIiwiR0VUIiwicmVxIiwidG9rZW4iLCJjb29raWVzIiwiZ2V0IiwidmFsdWUiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJzZXNzaW9uIiwiZGF0YSIsInN1YnNjcmlwdGlvbiIsImZyb20iLCJzZWxlY3QiLCJlcSIsInVzZXJJZCIsIm9yZGVyIiwiYXNjZW5kaW5nIiwibGltaXQiLCJtYXliZVNpbmdsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/subscriptions/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePassword: () => (/* binding */ comparePassword),\n/* harmony export */   createToken: () => (/* binding */ createToken),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n\n\nif (!process.env.JWT_SECRET) {\n    throw new Error(\"Missing JWT_SECRET\");\n}\nconst secret = new TextEncoder().encode(process.env.JWT_SECRET);\nasync function hashPassword(password) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, 10);\n}\nasync function comparePassword(password, hash) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hash);\n}\nasync function createToken(payload) {\n    return new jose__WEBPACK_IMPORTED_MODULE_1__.SignJWT(payload).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\").sign(secret);\n}\nasync function verifyToken(token) {\n    const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, secret);\n    return payload;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwQztBQUNaO0FBRTlCLElBQUksQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxVQUFVLEVBQUU7SUFDM0IsTUFBTSxJQUFJQyxNQUFNO0FBQ2xCO0FBRUEsTUFBTUMsU0FBUyxJQUFJQyxjQUFjQyxNQUFNLENBQUNOLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtBQUV2RCxlQUFlSyxhQUFhQyxRQUFnQjtJQUNqRCxPQUFPVCxvREFBVyxDQUFDUyxVQUFVO0FBQy9CO0FBRU8sZUFBZUUsZ0JBQWdCRixRQUFnQixFQUFFQyxJQUFZO0lBQ2xFLE9BQU9WLHVEQUFjLENBQUNTLFVBQVVDO0FBQ2xDO0FBRU8sZUFBZUcsWUFBWUMsT0FBd0Q7SUFDeEYsT0FBTyxJQUFJaEIseUNBQU9BLENBQUNnQixTQUNoQkMsa0JBQWtCLENBQUM7UUFBRUMsS0FBSztJQUFRLEdBQ2xDQyxXQUFXLEdBQ1hDLGlCQUFpQixDQUFDLE1BQ2xCQyxJQUFJLENBQUNkO0FBQ1Y7QUFFTyxlQUFlZSxZQUFZQyxLQUFhO0lBQzdDLE1BQU0sRUFBRVAsT0FBTyxFQUFFLEdBQUcsTUFBTWYsK0NBQVNBLENBQUNzQixPQUFPaEI7SUFDM0MsT0FBT1M7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2dvbGYtY2hhcml0eS1wbGF0Zm9ybS8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbkpXVCwgand0VmVyaWZ5IH0gZnJvbSBcImpvc2VcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5cbmlmICghcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIEpXVF9TRUNSRVRcIik7XG59XG5cbmNvbnN0IHNlY3JldCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKSB7XG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2g6IHN0cmluZykge1xuICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2gpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVG9rZW4ocGF5bG9hZDogeyB1c2VySWQ6IHN0cmluZzsgcm9sZTogc3RyaW5nOyBlbWFpbDogc3RyaW5nIH0pIHtcbiAgcmV0dXJuIG5ldyBTaWduSldUKHBheWxvYWQpXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogXCJIUzI1NlwiIH0pXG4gICAgLnNldElzc3VlZEF0KClcbiAgICAuc2V0RXhwaXJhdGlvblRpbWUoXCI3ZFwiKVxuICAgIC5zaWduKHNlY3JldCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYXdhaXQgand0VmVyaWZ5KHRva2VuLCBzZWNyZXQpO1xuICByZXR1cm4gcGF5bG9hZCBhcyB7IHVzZXJJZDogc3RyaW5nOyByb2xlOiBzdHJpbmc7IGVtYWlsOiBzdHJpbmcgfTtcbn1cbiJdLCJuYW1lcyI6WyJTaWduSldUIiwiand0VmVyaWZ5IiwiYmNyeXB0IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJFcnJvciIsInNlY3JldCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJoYXNoIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsImNyZWF0ZVRva2VuIiwicGF5bG9hZCIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldElzc3VlZEF0Iiwic2V0RXhwaXJhdGlvblRpbWUiLCJzaWduIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\nif (false) {}\nif (!process.env.SUPABASE_SERVICE_ROLE_KEY) {\n    throw new Error(\"Missing SUPABASE_SERVICE_ROLE_KEY\");\n}\nconst db = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://qgwfuperyuwqmfwsbnhm.supabase.co\", process.env.SUPABASE_SERVICE_ROLE_KEY);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUQ7QUFFckQsSUFBSSxLQUFxQyxFQUFFLEVBRTFDO0FBRUQsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QixFQUFFO0lBQzFDLE1BQU0sSUFBSUQsTUFBTTtBQUNsQjtBQUVPLE1BQU1FLEtBQUtOLG1FQUFZQSxDQUM1QkMsMENBQW9DLEVBQ3BDQSxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QixFQUNyQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dvbGYtY2hhcml0eS1wbGF0Zm9ybS8uL2xpYi9kYi50cz8xZGYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuaWYgKCFwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkxcIik7XG59XG5cbmlmICghcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVlcIik7XG59XG5cbmV4cG9ydCBjb25zdCBkYiA9IGNyZWF0ZUNsaWVudChcbiAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLFxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZXG4pO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJFcnJvciIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJkYiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/bcryptjs","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsubscriptions%2Fme%2Froute&page=%2Fapi%2Fsubscriptions%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscriptions%2Fme%2Froute.ts&appDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanupmishra%2FDownloads%2Fgolf-charity-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();