

import MarkdownRenderer from "./MarkdownRenderer";
import PageContentBlank from "./PageContentBlank";
import { useEffect, useState } from "react";
import { STORES_LOCATION_MD_PATH } from "../../config";



export const PageUbicaciones = () => {
const [markdown, setMarkdown] = useState("");


useEffect(() => {
  const fetchMarkdown = async () => {
    const path = STORES_LOCATION_MD_PATH || "/docs/ubicaciones.md";
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

export default PageUbicaciones;