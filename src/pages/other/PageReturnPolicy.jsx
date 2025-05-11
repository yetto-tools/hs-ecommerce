

import MarkdownRenderer from "./MarkdownRenderer";
import PageContentBlank from "./PageContentBlank";
import { useEffect, useState } from "react";
import { RETURN_POLICY_MD_PATH } from "../../config";



export const PageReturnPolicy = () => {
const [markdown, setMarkdown] = useState("");


useEffect(() => {
  const fetchMarkdown = async () => {
    const path = RETURN_POLICY_MD_PATH || "/docs/politicas-de-devolucion.md";
    const response = await fetch(path);
    const text = await response.text();
    setMarkdown(text);
  };

  fetchMarkdown();
}, []);

    return (
        <PageContentBlank>
            <MarkdownRenderer  content={markdown} />
        </PageContentBlank>
    )
}

export default PageReturnPolicy;