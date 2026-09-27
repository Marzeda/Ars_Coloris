import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PolishTypography() {
    const location = useLocation();

    useEffect(() => {
        const excludedPaths = [
            "/admin",
            "/artist",
            "/agnieszka",
            "/forgot-password",
            "/reset-password",
        ];

        const isExcludedPath = excludedPaths.some((path) =>
            location.pathname.startsWith(path)
        );

        if (isExcludedPath) {
            return;
        }

        const excludedTags = new Set([
            "SCRIPT",
            "STYLE",
            "TEXTAREA",
            "INPUT",
            "SELECT",
            "OPTION",
            "CODE",
            "PRE",
        ]);

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;

            if (
                parent &&
                !excludedTags.has(parent.tagName)
            ) {
                textNodes.push(node);
            }
        }

        textNodes.forEach((node) => {
            node.nodeValue = node.nodeValue.replace(
                /(^|[\s([{„"'])((?:a|i|o|u|w|z))\s+/gi,
                "$1$2\u00A0"
            );
        });
    }, [location.pathname]);

    return null;
}

export default PolishTypography;