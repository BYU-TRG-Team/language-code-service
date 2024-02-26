"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguage = exports.getAllLanguages = void 0;
const _data_1 = require("./data");
const constants_1 = require("./language-registry-fetcher/constants");
const _language_1 = __importDefault(require("./language"));
const BCP47Validator = new RegExp("^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$");
/**
 * Retrieves all languages from the IANA Language Subtag Registry.
 */
const getAllLanguages = () => _data_1.languageRegistry;
exports.getAllLanguages = getAllLanguages;
/**
 * Retrieves a language using a provided language tag.
 *
 * The primary subtag of the provided language tag will be used to query the IANA Language Subtag Registry.
 * Extended subtags will be derived from the provided language tag.
 *
 * Errors will be thrown if the provided language tag does not follow BCP 47 format or if its primary subtag does not exist in the IANA Language Subtag Registry.
 */
const getLanguage = (langTag) => {
    if (!BCP47Validator.test(langTag)) {
        throw new Error(`
      Error: Language tag "${langTag}" does not follow BCP 47 format.
    `);
    }
    const subtags = langTag.split("-").map(subTag => subTag.toLowerCase()).reduce((prev, curr, index) => ({
        primary: index === 0 ? curr : prev.primary,
        extended: index === 0 ? prev.extended : [...prev.extended, curr]
    }), {
        primary: "",
        extended: []
    });
    const matchedLanguage = _data_1.languageRegistry.find((language) => language.tag === subtags.primary);
    if (matchedLanguage === undefined) {
        throw new Error(`
      Error: Language subtag "${subtags.primary}" does not exist in the IANA Language Subtag Registry

      Please see ${constants_1.IANA_LANGUAGE_REGISTRY_URL} for supported subtags.
    `);
    }
    return new _language_1.default(subtags, matchedLanguage.description);
};
exports.getLanguage = getLanguage;
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map