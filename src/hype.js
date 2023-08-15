import {rehype} from "rehype";
import rehypeRewrite from "rehype-rewrite";
import stringify from "rehype-stringify";
import {universalStyles} from './constants.js'

const variableDefRegex = /(--[a-zA-Z0-9-_]+)\s*:\s(.+?);/g;
const variableUsageRegex = /var\((\s*--[a-zA-Z0-9-_]+\s*)(?:\)|,\s*(.*)\))/;

/**
 * @param {string} juicedHtml HTML to be juiced
 * Credit to @jakobo for this function; it's a modified version of his code
 * @returns {string} string
 */
const hypeJuicedHtml = (juicedHtml) => {
    const hyped = rehype()
    .use(rehypeRewrite, {
        rewrite: (node) => {
        if (node.type !== "element") {
            return node;
        }
        
        // inline styles into the <head>
        if (node.tagName === "head") {
            node.children = [
              ...node.children,
              {
                type: "element",
                tagName: "style",
                children: [{ type: "text", value: universalStyles }],
              },
            ];
          }
  
        const resolveVariables = (s) => {

            // pass 1: pull definitions
            const defs = new Map();
            let withoutDefs = s.replace(
            variableDefRegex,
            (_, def, value) => {
                defs.set(def.trim(), value.trim());
                return "";
            }
            );

            // pass 2: replace variables (maxCycles prevents Terrible Things from happening)
            let maxCycles = 1000;
            while (withoutDefs.match(variableUsageRegex)) {
            maxCycles--;
            if (maxCycles <= 0) {
                throw new Error("Max Cycles for replacement exceeded");
            }
            withoutDefs = withoutDefs.replace(
                variableUsageRegex,
                (_, def, fallback) => {
                const d = def.trim();
                if (defs.has(d)) {
                    return defs.get(d) ?? "";
                }
                return (fallback ?? "").trim();
                }
            );
            }

            // return clean result
            return withoutDefs;
        };
        node.properties = {
            ...node.properties,
            style: resolveVariables(`${node.properties?.style ?? ""}`) || undefined,
        };
        },
    })
    .use(stringify)
    .processSync(juicedHtml)
    .toString();

    return hyped;
}

export default hypeJuicedHtml